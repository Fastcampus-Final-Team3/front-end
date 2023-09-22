//import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const ListTemplete = ({ list, category }) => {
  return (
    <Listbox>
      {list.map((item) => (
        <TemplateBox key={item.category}>
          {item.title}
          <br />
          {item.description}
        </TemplateBox>
      ))}
    </Listbox>
  );
};

const Listbox = styled.div`
  //width: 100%;
  width: inherit;
  //background-color: rebeccapurple;
  margin-left: 20px;

  .tag-box {
    padding-bottom: 10px;
    //background-color: red;
    font-weight: 600;
    margin-top: 10px;
  }
`;
const TemplateBox = styled.div`
  width: 420px;
  height: 90px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #dddddd;
`;
