"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CoPoisoningCaseDto } from "@/lib/co-poisoning";
import {
  ageSeries,
  CAUSE_COLORS,
  causeOverTimeSeries,
  causeSeries,
  genderSeries,
  monthlySeries,
  timeSeriesByGranularity,
  type DashboardFilter,
  yearlySeries,
} from "@/lib/co-poisoning-analytics";
import { ChartCard } from "./chart-card";

function CasesDeathsChart({
  data,
  title,
  subtitle,
  filename,
}: {
  data: { label: string; cases: number; deaths: number }[];
  title: string;
  subtitle: string;
  filename: string;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle} filename={filename}>
      <div className="h-[280px] w-full">
        {data.length === 0 ? (
          <Empty />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
                minTickGap={16}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11 }}
                allowDecimals={false}
                label={{
                  value: "Тохиолдол",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 10,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                allowDecimals={false}
                label={{
                  value: "Нас баралт",
                  angle: 90,
                  position: "insideRight",
                  fontSize: 10,
                }}
              />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="cases"
                name="Тохиолдол"
                fill="#7EB6D9"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="deaths"
                name="Нас баралт"
                stroke="#E53935"
                strokeWidth={2}
                dot={{ r: 3, fill: "#E53935" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}

function GenderChart({ cases }: { cases: CoPoisoningCaseDto[] }) {
  const data = useMemo(() => genderSeries(cases).filter((d) => d.value > 0), [cases]);

  return (
    <ChartCard
      title="Хүйсийн хуваарилалт"
      subtitle="Эрэгтэй / эмэгтэй харьцаа"
      filename="huis-huvaarilalt"
    >
      <div className="h-[280px] w-full">
        {data.length === 0 ? (
          <Empty />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="46%"
                innerRadius={58}
                outerRadius={90}
                paddingAngle={2}
                label={({ percent, name }) =>
                  name === "Тодорхойгүй" ? "" : `${((percent ?? 0) * 100).toFixed(1)}%`
                }
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}

function AgeChart({ cases }: { cases: CoPoisoningCaseDto[] }) {
  const data = useMemo(() => ageSeries(cases), [cases]);

  return (
    <ChartCard
      title="Насны ангилал"
      subtitle="Насны бүлгийн тохиолдол"
      filename="nasnii-angilal"
    >
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 48, left: 8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
            <YAxis type="category" dataKey="label" width={88} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar
              dataKey="value"
              name="Тохиолдол"
              radius={[0, 4, 4, 0]}
              label={{ position: "right", fontSize: 11 }}
            >
              {data.map((d) => (
                <Cell key={d.key} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function CausePieChart({
  cases,
  causeLabels,
}: {
  cases: CoPoisoningCaseDto[];
  causeLabels: string[];
}) {
  const data = useMemo(() => causeSeries(cases, causeLabels), [cases, causeLabels]);

  return (
    <ChartCard
      title="Шалтгааны хуваарилалт"
      subtitle="Шалтгаанаар ангилсан тохиолдол"
      filename="shaltgaan-huvaarilalt"
    >
      <div className="h-[280px] w-full">
        {data.length === 0 ? (
          <Empty />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="46%"
                innerRadius={50}
                outerRadius={88}
                paddingAngle={2}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, item) => {
                  const percent = (item?.payload as { percent?: number })?.percent;
                  return [
                    `${value}${percent != null ? ` (${percent}%)` : ""}`,
                    String(name),
                  ];
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}

function CauseBarChart({
  cases,
  causeLabels,
}: {
  cases: CoPoisoningCaseDto[];
  causeLabels: string[];
}) {
  const data = useMemo(() => causeSeries(cases, causeLabels), [cases, causeLabels]);

  return (
    <ChartCard
      title="Шалтгаанаар харьцуулалт"
      subtitle="Тохиолдлын тоогоор"
      filename="shaltgaan-barytsuulalt"
    >
      <div className="h-[280px] w-full">
        {data.length === 0 ? (
          <Empty />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 40, left: 8, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar
                dataKey="value"
                name="Тохиолдол"
                radius={[0, 4, 4, 0]}
                label={{ position: "right", fontSize: 11 }}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}

function CauseOverTimeChart({
  cases,
  granularity,
  causeLabels,
}: {
  cases: CoPoisoningCaseDto[];
  granularity: DashboardFilter["granularity"];
  causeLabels: string[];
}) {
  const { causes, rows } = useMemo(
    () => causeOverTimeSeries(cases, granularity, causeLabels),
    [cases, granularity, causeLabels]
  );

  const unitLabel =
    granularity === "year" ? "жилээр" : granularity === "month" ? "сараар" : "өдрөөр";

  return (
    <ChartCard
      title="Шалтгаан · цаг хугацаа"
      subtitle={`Шалтгаанаар ангилсан хуваарилалт (${unitLabel})`}
      filename="shaltgaan-tsag"
    >
      <div className="h-[320px] w-full">
        {rows.length === 0 ? (
          <Empty />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
                minTickGap={20}
              />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              {causes.map((cause, index) => (
                <Bar
                  key={cause}
                  dataKey={cause}
                  stackId="a"
                  fill={CAUSE_COLORS[index % CAUSE_COLORS.length]}
                  name={cause}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}

function Empty() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-slate-400">
      Мэдээлэл байхгүй
    </div>
  );
}

export function CoHomePreviewCharts({
  cases,
  deathCodes,
  causeLabels,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
  causeLabels: string[];
}) {
  const yearly = useMemo(() => yearlySeries(cases, deathCodes), [cases, deathCodes]);
  const monthly = useMemo(
    () => monthlySeries(cases, deathCodes).slice(-12),
    [cases, deathCodes]
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <CasesDeathsChart
        data={yearly}
        title="Жилийн харьцуулалт"
        subtitle="Тохиолдол ба нас баралт"
        filename="home-jil-haritsuulalt"
      />
      <CasesDeathsChart
        data={monthly}
        title="Сүүлийн 12 сар"
        subtitle="Сараар нийт тохиолдол"
        filename="home-sar-huvaari"
      />
      <CausePieChart cases={cases} causeLabels={causeLabels} />
      <GenderChart cases={cases} />
    </div>
  );
}

export function OverviewCharts({
  cases,
  deathCodes,
  filter,
  causeLabels,
}: {
  cases: CoPoisoningCaseDto[];
  deathCodes: number[];
  filter: DashboardFilter;
  causeLabels: string[];
}) {
  const timeData = useMemo(
    () => timeSeriesByGranularity(cases, deathCodes, filter.granularity),
    [cases, deathCodes, filter.granularity]
  );

  const monthly = useMemo(() => monthlySeries(cases, deathCodes), [cases, deathCodes]);
  const yearly = useMemo(() => yearlySeries(cases, deathCodes), [cases, deathCodes]);

  const granularityTitle =
    filter.granularity === "year"
      ? "Жилээр"
      : filter.granularity === "month"
        ? "Сараар"
        : "Өдрөөр";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-2">
        <CasesDeathsChart
          data={timeData}
          title={`${granularityTitle} нийт тохиолдол`}
          subtitle="Сонгосон шүүлтийн дагуу тохиолдол ба нас баралт"
          filename="tsag-huvaari"
        />
        <CasesDeathsChart
          data={filter.granularity === "year" ? monthly : yearly}
          title={filter.granularity === "year" ? "Сараар хуваарилалт" : "Жилийн харьцуулалт"}
          subtitle={
            filter.granularity === "year"
              ? "Сонгосон хугацааны сарын нийлбэр"
              : "Жил бүрийн нийт"
          }
          filename="nemelt-huvaari"
        />
        <CausePieChart cases={cases} causeLabels={causeLabels} />
        <CauseBarChart cases={cases} causeLabels={causeLabels} />
        <GenderChart cases={cases} />
        <AgeChart cases={cases} />
      </div>
      <CauseOverTimeChart
        cases={cases}
        granularity={filter.granularity}
        causeLabels={causeLabels}
      />
    </div>
  );
}
