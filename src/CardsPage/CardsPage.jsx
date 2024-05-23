import { useEffect, useMemo, useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Card, Navbar, Spinner } from "./components";

import styled from "styled-components";

const Section = styled.section`
  margin: 30px 0px;
`;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 40px;
  overflow: auto;
`;

const CardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
`;

export const CardsPage = () => {
  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * (500 - 200) + 200);
  }, []);

  const url = `https://fakerapi.it/api/v1/companies?_quantity=${randomNumber}`;
  const { data, isLoading } = useFetch(url);
  const { data: results } = !!data && data;
  const [copyListCards, setCopyListCards] = useState([]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    setCopyListCards(results);
  }, [isLoading]);


  return (
    <>
      <Navbar />

      <Section>
        <Container>
          <CardWrapper>
            {isLoading ? (
              <Spinner />
            ) : (
              copyListCards?.map((card, index) => (
                <Card
                  key={card.id}
                  {...card}
                  index={index}
                  copyListCards={copyListCards}
                  setCopyListCards={setCopyListCards}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                />
              ))
            )}
          </CardWrapper>
        </Container>
      </Section>
    </>
  );
};
