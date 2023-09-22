import React from 'react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import FaceDetection from './FaceDetection';
import theme, { Modal, ModalBackground, ModalContainer } from '@Styles/theme';
import { useRecoilState } from 'recoil';
import { CropImage } from '@Recoil/app';
import ROUTE_PATH from '@Constant/routePath';
import { FormattedMessage } from 'react-intl';

import {
  $FlexContainer,
  $Guidance,
  $ImageBox,
  $ImageLabel,
  $SelectImgButton,
  $InputFile,
  $NextButton,
  $Notification,
  $CroppedImageBox,
} from './style';

function ImageUploadPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imagePreviewURL = useRecoilState(CropImage)[0];

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const clickInput = () => {
    inputRef.current?.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      setIsModalOpen(true);
      return;
    }

    alert('다시 시도해 주세요.');
  };

  return (
    <ModalContainer isModalOpen={isModalOpen}>
      {isModalOpen && imageFile ? (
        <>
          <Modal>
            <FaceDetection
              imageFile={imageFile}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
          <ModalBackground />
        </>
      ) : null}

      <$FlexContainer isModalOpen={isModalOpen}>
        <$ImageBox>
          {imagePreviewURL ? (
            <>
              <$CroppedImageBox
                src={imagePreviewURL}
                alt="preview image"
                width={150}
                height={150}
              />
              <$InputFile
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={selectImage}
              />
            </>
          ) : (
            <$ImageLabel>
              <$InputFile
                ref={inputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={selectImage}
              />
              <FontAwesomeIcon
                icon={faUserPlus}
                size="3x"
                color={theme.gray[300]}
              />
            </$ImageLabel>
          )}
        </$ImageBox>

        <$SelectImgButton onClick={clickInput}>
          <FormattedMessage id="selectImgButton" />
        </$SelectImgButton>
        <$Guidance>
          <FormattedMessage id="guidance" />
        </$Guidance>
        <$Notification>
          <h6>
            <FontAwesomeIcon icon={faFaceSmile} size="sm" />
            <FormattedMessage id="notification-1" />
          </h6>
          <FormattedMessage id="notification-2" />
          <br />
          <FormattedMessage id="notification-3" />
        </$Notification>

        <Link href={ROUTE_PATH.choiceColor}>
          <$NextButton disabled={!imagePreviewURL}>
            <FormattedMessage id="nextButton" />
          </$NextButton>
        </Link>
      </$FlexContainer>
    </ModalContainer>
  );
}

export default ImageUploadPage;
