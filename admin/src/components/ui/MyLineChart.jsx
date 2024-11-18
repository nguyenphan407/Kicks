import React from "react";
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


const chartConfig = {
    revenue: {
        label: "revenue",
        color: "hsl(var(--chart-1))", // Sử dụng màu từ biến CSS của ShadCN
    },
};

export function MyLineChart() {
    const chartData = [
        { month: "January", revenue: 1836 },
        { month: "February", revenue: 5205 },
        { month: "March", revenue: 2337 },
        { month: "April", revenue: 783 },
        { month: "May", revenue: 2049 },
        { month: "June", revenue: 1214 },
        { month: "July", revenue: 3400 },
        { month: "August", revenue: 410 },
        { month: "September", revenue: 1451 },
        { month: "October", revenue: 4313 },
        { month: "November", revenue: 2740 },
        { month: "December", revenue: 3140 },
    ];
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center border-b border-black pb-4">
                    <CardTitle>Sale Graph</CardTitle>
                    <div className="flex gap-[15px]">
                        <button className="font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border border-black uppercase ">
                            Weekly
                        </button>
                        <button className="font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border border-black uppercase">
                            Monthly
                        </button>
                        <button className="font-inter text-[14px] font-medium px-4 py-[5px] rounded-[8px] border border-black uppercase">
                            Yearly
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 20,
                                left: 20, // Điều chỉnh margin để cân đối
                                right: 20,
                                bottom: 20,
                            }}
                        >
                            {/* Hiển thị đường lưới ngang */}
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />
                            {/* Trục Y với khoảng cách mốc cụ thể */}
                            <YAxis
                                width={40} // Độ rộng cho không gian các mốc
                                axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }} // Đường kẻ trái
                                tickLine={false} // Loại bỏ dấu tick
                                tickFormatter={(value) => `$${value}`} // Định dạng giá trị
                                tick={{
                                    fontFamily: "Inter",
                                    fontSize: 16, // Kích thước chữ
                                    fill: "#8E8E8E", // Màu chữ
                                    fontWeight: "600", // Độ dày chữ
                                }}
                            />
                            {/* Trục X */}
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)} // Hiển thị tháng ngắn gọn
                                tick={{
                                    fontFamily: "Inter",
                                    fontSize: 16, // Kích thước chữ
                                    fill: "black", // Màu chữ
                                    fontWeight: "600", // Độ dày chữ
                                }}
                            />
                            {/* Tooltip */}
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            {/* Đường biểu đồ */}
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
            </CardContent>
        </Card>
    );
}
