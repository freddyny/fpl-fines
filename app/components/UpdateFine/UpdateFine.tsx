"use client";

import React, { useState, useEffect } from "react";
import Popup from "../Modals/Popups";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Result } from "../../lib/types/FPLLeague";
import { supabase } from "@/app/lib/database/supabaseClient";

interface UpdateFineProps {
    username: string ;
    fine: string;
    currency: string;
    team_name: string;
    fine_description: string;
    leagueData: FPLLeague; // Ensure this type matches your actual data structure
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateFine: React.FC<UpdateFineProps> = ({ username, fine, currency, team_name, fine_description, leagueData, setOpen }) => {
    const [newFine, setNewFine] = useState<string>(fine);
    const [newCurrency, setNewCurrency] = useState<string>(currency);
    const [newTeamName, setNewTeamName] = useState<string>(team_name);
    const [newDescription, setNewDescription] = useState<string>(fine_description);
    const [newUserName, setNewUserName] = useState<string>(username); 
    const [newUserId, setNewUserId] = useState<number>(0);

    const userData = leagueData.new_entries.results;

    // Set initial values when the component mounts
    useEffect(() => {
        if (userData.length > 0) {
            const firstUser = userData[0];
            setNewTeamName(firstUser.entry_name);
            setNewUserName(firstUser.player_first_name + " " + firstUser.player_last_name);
            setNewUserId(firstUser.entry);
        }

    }, [userData]);

    const handleSave = () => {
        const leagueId = leagueData.league.id;
        
        // Function to add fine to the database
        const addFine = async () => {
            const { data, error } = await supabase.from('fines').insert([
                { 
                    league_id: leagueId, 
                    user_id: newUserId, 
                    fine_description: newDescription, 
                    fine: newFine, 
                    currency: newCurrency, 
                    team_name: newTeamName,
                    username: newUserName
                }
            ]);
            if (error) {
                console.log('Error inserting fine:', error);
            } else {
            }
        };
    
        // Call the addFine function to insert the data
        addFine();
    
        // Close the modal after saving
        setOpen(false);
    };

    const updateDropdownInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userIdData = userData.find((user: Result) => user.entry === Number(e.target.value));
        setNewTeamName(userIdData.entry_name);
        setNewUserName(userIdData.player_first_name + " " + userIdData.player_last_name);
        setNewUserId(userIdData.entry);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <Popup isOpen={true} onClose={closeModal}>
            <div className="w-[90%] md:w-4/5 lg:w-1/2 fixed left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1010] bg-white shadow-lg rounded-lg top-[50%] transition duration-500">
                <div className="relative h-[100px] px-4 py-3 rounded-t-lg bg-secondary-gradient text-primary-gray font-bold flex justify-end">
                    <CloseOutlinedIcon className="text-xl cursor-pointer" onClick={closeModal} />
                    <div className="w-full h-10 absolute left-0 bottom-0 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                <h2 className="text-center text-primary-gray text-lg font-bold py-2">Update Fine</h2>
                <div className="px-4 py-3">
                    <div className="mb-4">
                        <label className="block text-gray-700">Select User:</label>
                        <select
                            value={newUserId.toString()}
                            onChange={updateDropdownInput}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        >
                            {userData.map((user: Result) => (
                                <option key={user.entry} value={user.entry}>
                                    {user.player_first_name + " " + user.player_last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fine Description:</label>
                        <textarea 
                            value={newDescription} 
                            onChange={e => setNewDescription(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fine Amount:</label>
                        <input 
                            type="number" 
                            value={newFine} 
                            onChange={e => setNewFine(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Currency:</label>
                        <input 
                            type="text" 
                            value={newCurrency} 
                            onChange={e => setNewCurrency(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    
                    <button onClick={handleSave} className="bg-secondary-gradient w-1/3 m-5 py-2 rounded-full">Save</button>
                </div>
            </div>
        </Popup>
    );
};

export default UpdateFine;
