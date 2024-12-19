import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { getStatics } from "@/apis/reportApi";

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
};

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function MyLineChart() {
    const [metric, setMetric] = useState("month");
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchChartData = async (selectedMetric) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getStatics(selectedMetric);

            const transformedData = response.data.map((item) => {
                let key = "Unknown";
                if (selectedMetric === "day") {
                    key = item.day || "Unknown Day";
                } else if (selectedMetric === "month") {
                    key = monthNames[item.month - 1] || "Unknown Month";
                } else if (selectedMetric === "year") {
                    key = item.year || "Unknown Year";
                }
                const revenue = parseFloat(item.revenue) || 0;
                return { [selectedMetric]: key, revenue };
            });

            setChartData(transformedData);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChartData(metric);
    }, [metric]);

    const handleMetricChange = (selectedMetric) => {
        setMetric(selectedMetric);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center border-b border-black pb-4">
                    <CardTitle>Sales Graph</CardTitle>
                    <div className="flex gap-4">
                        {["day", "month", "year"].map((type) => (
                            <button
                                key={type}
                                className={`font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border uppercase active:opacity-90 active:scale-95 ${
                                    metric === type
                                        ? "bg-black text-white"
                                        : "border-black text-black"
                                }`}
                                onClick={() => handleMetricChange(type)}
                            >
                                {type === "day"
                                    ? "Daily"
                                    : type === "month"
                                    ? "Monthly"
                                    : "Yearly"}
                            </button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <span>Loading data...</span>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-96 text-red-500">
                        <span>{error}</span>
                    </div>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    left: 20,
                                    right: 20,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <YAxis
                                    width={40}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                    domain={[0, 'dataMax']} // Giới hạn từ 0 đến giá trị lớn nhất
                                    tick={{
                                        fontFamily: "Inter",
                                        fontSize: 14,
                                        fill: "#8E8E8E",
                                    }}
                                />
                                <XAxis
                                    dataKey={metric}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) =>
                                        metric === "month"
                                            ? value.slice(0, 3)
                                            : value
                                    }
                                    tick={{
                                        fontFamily: "Inter",
                                        fontSize: 14,
                                        fill: "black",
                                    }}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Line
                                    dataKey="revenue"
                                    type="monotone"
                                    stroke="#4A69E2"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
