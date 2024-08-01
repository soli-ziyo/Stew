import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DateStore } from "../stores/DateStore"; // Zustand store import

import dad from "../images/dad.png";
import me from "../images/me.jpg";
import mom from "../images/mom.png";

const data = [
  { name: "나", image: me, posts: 10 },
  { name: "아빠", image: dad, posts: 30 },
  { name: "엄마", image: mom, posts: 20 },
];

const MAX_BAR_HEIGHT = 230; // 최대 막대 높이

const Chart = ({ accessToken }) => {
  const { fetchData } = DateStore();
  const [chartDate, setChartDate] = useState(new Date());

  useEffect(() => {
    fetchData(accessToken);
  }, [accessToken, fetchData]);

  const handlePrevMonth = () => {
    const newDate = new Date(
      chartDate.getFullYear(),
      chartDate.getMonth() - 1,
      1
    );
    setChartDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      chartDate.getFullYear(),
      chartDate.getMonth() + 1,
      1
    );
    setChartDate(newDate);
  };

  const year = chartDate.getFullYear();
  const month = chartDate.getMonth();

  // 데이터 중 최대 포스트 수 찾기
  const maxPosts = Math.max(...data.map((member) => member.posts));

  return (
    <ChartContainer>
      <MonthYear>
        <Arrow onClick={handlePrevMonth}>{"<"}</Arrow>
        {year}.{String(month + 1).padStart(2, "0")}
        <Arrow onClick={handleNextMonth}>{">"}</Arrow>
      </MonthYear>
      <Bars>
        {data.map((member, index) => {
          const height = (member.posts / maxPosts) * MAX_BAR_HEIGHT; // 최대값을 기준으로 상대적 높이 계산
          const opacity = member.posts / maxPosts; // 투명도 반전 계산
          return (
            <Bar key={index}>
              <PostCount>{member.posts}</PostCount>
              <BarFill
                style={{
                  height: `${height}px`,
                  backgroundColor: `rgba(255, 91, 2, ${opacity})`,
                }}
              />
              <ProfileImage src={member.image} alt={member.name} />
            </Bar>
          );
        })}
      </Bars>
    </ChartContainer>
  );
};

export default Chart;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative; // Relative로 설정하여 자식 요소의 절대 위치를 기준으로 함
  overflow: hidden; // 내부 요소가 컨테이너 밖으로 벗어나지 않도록 설정
`;

const Arrow = styled.div`
  cursor: pointer;
  margin: 0 40px;
  background-color: transparent;
  border: 2px solid #e2e2e2;
  border-radius: 50%;
  font-weight: 400;
  font-size: 14px;
  width: 20px;
  height: 20px;
  align-content: center;
  text-align: center;
  color: #8c8c8c;
`;

const MonthYear = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
  color: #222222;
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px; // 전체 차트 높이
  position: relative; // Relative로 설정하여 Bar의 절대 위치를 기준으로 함
  margin-top: 80px;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  position: relative;
  margin-right: 5px;
  margin-left: 5px;
`;

const BarFill = styled.div`
  width: 50%;
  position: absolute;
  bottom: 10px; // 막대의 하단에서 시작
  border-radius: 20px;
`;

const ProfileImage = styled.img`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  position: absolute;
  bottom: 0px; // 이미지 위치 조정
`;

const PostCount = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  position: absolute;
  top: -60px;
`;
