import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo() {

    const medicineNames = [

        "Bupropion",
        "Lamotrigine",
        "Zolpidem",
        "Cephalexin",
        "Ciprofloxacin",

    ];



    return (
            <BarChart
                series={[
                    { data: [3532, 4411, 2433, 3421, 3312] },

                ]}
                xAxis={[{ data: medicineNames, scaleType: 'band' }]}
                width={600}
                height={400}
                margin={{ left: 70 }}
            />
    );
}



        