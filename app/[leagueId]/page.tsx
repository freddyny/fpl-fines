"use client"; // Add this at the top

import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import MainCard from "../components/Cards/MainCard";
import DisplayFineSummary from "../components/DisplayFineSummary/DisplayFineSummary";
import { League } from "../lib/types/FPLLeague";
import DisplayAllFines from "../components/DisplayFineSummary/DisplayAllFines";
import UpdateFine from "../components/UpdateFine/UpdateFine";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Page = ({
  params,
}: {
  params: { leagueId: string };
}) => {
  
    const { leagueId } = params;

    const [data, setData] = useState<League | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openAddFineModal, setOpenAddFineModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/getLeagueData/${leagueId}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data: League = await res.json();
                setData(data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [leagueId]);

    const handleAddFineClick = () => {
      setOpenAddFineModal(true);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error}</p>;
    }

    if (!data) {
        return <p>No data available...</p>;
    }

    return (
      <main>
        <Header />
        <div className="flex justify-center">
          <div className="w-11/12 m-auto -mt-24 z-[30] absolute">
            <div className="flex flex-col md:flex-row justify-center">
              <div className="md:w-10/12">
                <MainCard title={`Fines for ${data.league.name}`}>
                  <DisplayFineSummary leagueId={leagueId} users={data?.new_entries?.results || []}/> 
                </MainCard>
              </div>
              <div className="md:w-2/12 md:ml-8 mt-8 md:mt-0">
                <MainCard title="Add fine">
                  <div className="flex justify-center m-5">
                    <button className="bg-secondary-gradient m-auto py-2 px-2 rounded-full" onClick={handleAddFineClick}>
                      <AddCircleOutlineIcon/>
                    </button>
                  </div>
                </MainCard>
              </div>
            </div>
            <div className="mt-10 z-[30]">
              <MainCard title={`Full list of fines for ${data.league.name}`}>
                <div className="h-80 overflow-y-auto">
                  <DisplayAllFines isDelete={false} leagueData={data}/>
                </div>
              </MainCard>
            </div>
          </div>        
        </div>
        {openAddFineModal && (
          <UpdateFine
            username=""
            fine=""
            currency=""
            team_name=""
            fine_description=""
            leagueData={data}
            setOpen={setOpenAddFineModal}
          />
        )}
      </main>
    );
}

export default Page;
