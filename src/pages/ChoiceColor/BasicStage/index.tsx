import React from 'react';
import type { Type } from '@Data/color';
import type { ChoiceColorDataType } from '@Data/choiceColorData';
import Guidance from '../Guidance';
import {
  $StatusBox,
  $StatusBar,
  $StatusContent,
  $ColorBox,
  $Color,
} from './style';

interface BasicStageProps {
  userImg: string;
  stageNum: number;
  MAX_STAGE_NUM: number;
  basicColorOptions: ChoiceColorDataType[];
  onBasicClick: (type: Type) => void;
}

function BasicStage({
  userImg,
  stageNum,
  MAX_STAGE_NUM,
  basicColorOptions,
  onBasicClick,
}: BasicStageProps) {
  return (
    <>
      <$StatusBox>
        <$StatusBar width={`${(stageNum + 1) * (100 / MAX_STAGE_NUM)}%`} />
      </$StatusBox>
      <$StatusContent>
        {stageNum + 1}/{MAX_STAGE_NUM} 단계
      </$StatusContent>

      <Guidance />

      <$ColorBox>
        {basicColorOptions.map((item) => (
          <$Color
            key={item.id}
            color={item.color}
            onClick={() => onBasicClick(item.type)}
          >
            <img src={userImg} alt="사용자 이미지" />
          </$Color>
        ))}
      </$ColorBox>
    </>
  );
}

export default BasicStage;
