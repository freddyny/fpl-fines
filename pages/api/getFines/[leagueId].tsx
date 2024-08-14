// pages/api/getFines/[leagueId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../app/lib/database/supabaseClient'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("in right API");
    
    try {
        const { data, error } = await supabase
            .from('fines')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
}
