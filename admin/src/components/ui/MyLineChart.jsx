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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { getStatics } from "@/apis/reportApi"; // Đảm bảo đường dẫn đúng

const chartConfig = {
    revenue: {
        label: "revenue",
        color: "hsl(var(--chart-1))", // Sử dụng màu từ biến CSS của ShadCN
    },
};

// Mảng tên tháng để chuyển đổi từ số sang tên
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function MyLineChart() {
    const [metric, setMetric] = useState("month"); // Mặc định là 'month'
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hàm fetch dữ liệu từ API
    const fetchChartData = async (selectedMetric) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getStatics(selectedMetric);
            // Giả sử API trả về dữ liệu dạng [{ day: "2024-12-01", revenue: 1000 }, ...]
            // Hoặc [{ month: 1, revenue: 1836 }, ...] nếu metric là 'month'
            // Hoặc [{ year: 2024, revenue: 3140 }, ...] nếu metric là 'year'

            const transformedData = response.data.map((item) => {
                let key;
                let value;
                if (selectedMetric === "day") {
                    key = item.day;
                } else if (selectedMetric === "month") {
                    // Kiểm tra nếu item.month là số, chuyển đổi thành tên tháng
                    if (typeof item.month === 'number' && item.month >= 1 && item.month <= 12) {
                        key = monthNames[item.month - 1];
                    } else if (typeof item.month === 'string') {
                        key = item.month;
                    } else {
                        key = "Unknown";
                    }
                } else if (selectedMetric === "year") {
                    key = item.year; // Ví dụ: "2024"
                }
                value = item.revenue;
                return {
                    [selectedMetric]: key,
                    revenue: value,
                };
            });
            setChartData(transformedData);
        } catch (err) {
            console.error(err);
            setError("Đã xảy ra lỗi khi tải dữ liệu.");
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetch dữ liệu khi component mount và khi metric thay đổi
    useEffect(() => {
        fetchChartData(metric);
    }, [metric]);

    // Hàm xử lý khi người dùng chọn metric
    const handleMetricChange = (selectedMetric) => {
        setMetric(selectedMetric);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center border-b border-black pb-4">
                    <CardTitle>Sale Graph</CardTitle>
                    <div className="flex gap-[15px]">
                        <button
                            className={`font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border uppercase ${
                                metric === "day"
                                    ? "bg-black text-white"
                                    : "border-black text-black"
                            }`}
                            onClick={() => handleMetricChange("day")}
                        >
                            Weekly
                        </button>
                        <button
                            className={`font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border uppercase ${
                                metric === "month"
                                    ? "bg-black text-white"
                                    : "border-black text-black"
                            }`}
                            onClick={() => handleMetricChange("month")}
                        >
                            Monthly
                        </button>
                        <button
                            className={`font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border uppercase ${
                                metric === "year"
                                    ? "bg-black text-white"
                                    : "border-black text-black"
                            }`}
                            onClick={() => handleMetricChange("year")}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <span>Đang tải dữ liệu...</span>
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
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />
                                <YAxis
                                    width={40}
                                    axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                    tick={{
                                        fontFamily: "Inter",
                                        fontSize: 16,
                                        fill: "#8E8E8E",
                                        fontWeight: "600",
                                    }}
                                />
                                <XAxis
                                    dataKey={metric}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => {
                                        if (metric === "day") {
                                            const date = new Date(value);
                                            if (!isNaN(date)) {
                                                return date.toLocaleDateString();
                                            }
                                            return value;
                                        } else if (metric === "month") {
                                            return typeof value === 'string' ? value.slice(0, 3) : value;
                                        } else if (metric === "year") {
                                            return value;
                                        }
                                        return value;
                                    }}
                                    tick={{
                                        fontFamily: "Inter",
                                        fontSize: 16,
                                        fill: "black",
                                        fontWeight: "600",
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Line
                                    dataKey="revenue"
                                    type="natural"
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
