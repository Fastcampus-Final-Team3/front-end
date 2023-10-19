import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Carousel } from 'antd';

type TemplateItem = {
  templateId: number;
  templateTitle: string;
  templateDescription: string;
};

export default function SearchCarousel() {
  const [templateData, setTemplateData] = useState<TemplateItem[]>([]);
  // const {
  //   data: templateData,
  //   // isLoading,
  //   // isError,
  // } = useQuery(
  //   ['templateData', 'PERSONAL'], // Use 'PERSONAL' as a query key
  //   () => fetchTemplateData('PERSONAL'), // Pass 'PERSONAL' as a parameter
  // );

  // useEffect(() => {
  //   fetchTemplateData('PERSONAL');
  // }, []);

  useEffect(() => {
    const fetchData = async (PERSONAL: string) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/wall/templates?category=${PERSONAL}`,
        );
        const data = response.data.data.list;
        setTemplateData(data);
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
    };
    fetchData('PERSONAL');
  }, []);

  return (
    <>
      <Carousel autoplay className="calrouselBox">
        {templateData?.map((item) => (
          <TemplateBox key={item.templateId}>
            <TempalteHeaderBox>
              <p className="templateTitle">{item.templateTitle}</p>
            </TempalteHeaderBox>
            <p className="descriptionBox">{item.templateDescription}</p>
          </TemplateBox>
        ))}
      </Carousel>
    </>
  );
}

const TemplateBox = styled.div`
  width: 420px;
  height: 120px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #f0f0f0;
  padding: 10px;

  :where(.css-dev-only-do-not-override-847yc7).ant-carousel .slick-dots li {
    background-color: rgba(36, 147, 251, 1);
    color: yellow;
  }

  :where(.css-dev-only-do-not-override-847yc7).ant-carousel
    .slick-dots
    li.slick-active
    button {
    background: #f0f0f0;
    opacity: 1;
  }

  .descriptionBox {
    width: auto;
    margin: auto;
    margin-top: 10px;
  }
`;

const TempalteHeaderBox = styled.div`
  width: 300px;
  display: flex;
  margin: auto;

  .templateTitle {
    width: auto;
    color: rgba(45, 44, 56, 1);
    font-weight: 800;
    font-size: 16px;
    height: 30px;
  }
`;
