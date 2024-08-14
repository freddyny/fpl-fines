"use client";
import React, { useState } from "react";
import Popup from "../Modals/Popups";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div
      className="relative h-[300px]"
      style={{
        background:
          "radial-gradient(circle, rgba(0, 30, 9, 0.8) 10%, rgba(0, 0, 0, 0.8) 100%), url(/stadium.png) no-repeat center center / cover",
      }}
    >
      {/* Logo start */}
      <div className="pt-4 px-4 md:px-8">
        <img
          src="/header-logo-cropped.svg"
          alt="FPL League Insights"
          className="h-12"
        />
      </div>
      {/* Logo end */}

      {/* Rules Button */}
      <button
        className="absolute top-10 right-20 bg-secondary-gradient py-2 px-2 rounded-full"
        onClick={togglePopup}
      >
        <TextSnippetOutlinedIcon className="text-white" />
      </button>

      {/* Rules Popup */}
      <Popup isOpen={isPopupOpen} onClose={togglePopup}>
        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="relative h-[100px] rounded-t-lg bg-secondary-gradient text-primary-gray font-bold flex justify-end">
            <CloseOutlinedIcon className="text-xl cursor-pointer" onClick={togglePopup} />
            <div className="w-full h-10 absolute left-0 bottom-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <div className="px-4 py-3">
            <h2 className="text-xl font-bold mb-4">Fantasy Fines Rules</h2>
            <div className="text-sm text-gray-700">
              <p><strong>Rules that apply to each Gameweek (GW):</strong></p>
              <ul className="list-disc ml-5 mb-4">
                <li>Forgot to update team: 25 kr</li>
                <li>Lowest points in a DGW / Blank GW: 50 kr</li>
                <li>Under 50 points on free-hit / wildcard: 50 kr</li>
                <li>Triple-captain with less than 10 points: 50 kr</li>
                <li>More than 2 points with minus points: 25 kr</li>
                <li>69 points: give out 50 kr</li>
                <li>If someone loses the round by 25 or more points up to the second-to-last: 50 kr</li>
                <li>Entering the top 100 club: give out 50 kr</li>
                <li>Under 4 points on captain: 10 kr</li>
                <li>If a player you have gets a red card: 25 kr</li>
                
              </ul>
              <p><strong>Each GW-specific fine costs 50 kr. GW-Specific Fines:</strong></p>
              <ul className="list-disc ml-5">
                <li>GW01: Lowest points after GW</li>
                <li>GW02: Most players with no returns</li>
                <li>GW03: Most players not starting</li>
                <li>GW04: Best differential player (total in the game)</li>
                <li>GW05: Each player with less than 5 points below the average</li>
                <li>GW06: Fine for the player who ends in the middle of the group (position #4)</li>
                <li>GW07: Most points on the bench</li>
                <li>GW08: Least captain points</li>
                <li>GW09: Worst return for transfers</li>
                <li>GW10: Player with highest net gain within the league</li>
                <li>GW11: Most auto-sub points</li>
                <li>GW12: Most players with no returns</li>
                <li>GW13: Lowest points on captain</li>
                <li>GW14: Fine for the player who ends in the middle of the group (position #4)</li>
                <li>GW15: Worst return for transfers</li>
                <li>GW16: Less than 5 points below the average</li>
                <li>GW17: Most players not starting</li>
                <li>GW18: Lowest points in GW (100 kr fine)</li>
                <li>GW19: Most points on the bench</li>
                <li>GW20: Player with the best player in GW can issue a fine</li>
                <li>GW21: Best differential player</li>
                <li>GW22: Player with highest net gain within the league</li>
                <li>GW23: Most auto-sub points</li>
                <li>GW24: Most players with no returns</li>
                <li>GW25: Lowest points on captain</li>
                <li>GW26: Less points than the average (not 5 points below anymore)</li>
                <li>GW27: Player with the best player in GW can issue a fine</li>
                <li>GW28: Most auto-sub points</li>
                <li>GW29: Player with highest net gain within the league</li>
                <li>GW30: Best differential player</li>
                <li>GW31: Lowest points on captain</li>
                <li>GW32: Fine for the player who ends in the middle of the group (position #4)</li>
                <li>GW33: Worst immediate return for transfers</li>
                <li>GW34: Most points on the bench</li>
                <li>GW35: Player with the best score issues a fine</li>
                <li>GW36: Lowest points on captain (100 kr fine)</li>
                <li>GW37: Most players with no returns (100 kr fine)</li>
                <li>GW38: Lowest points in GW (100 kr fine)</li>
              </ul>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Header;
