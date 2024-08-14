import Image from "next/image";
import Header from "@/app/components/Header/Header";
import MainCard from "./components/Cards/MainCard";
import DisplayFineSummary from "./components/DisplayFineSummary/DisplayFineSummary";

const Page = async ({
  params,
}: {
  params: { leagueId: string };
}) => {
  
  // get leagueId From url props
  const { leagueId } = params;

  // get data from fpl league api
  
  
  return (
    
    <main >
      <Header />
      <div className="flex justify-center">
        <p>FPL Fines. Add your leagueId to the url, in order to get fines: fpl-fines.xyz/leagueID</p>
      </div>
    </main>
    
  );
}
export default Page;