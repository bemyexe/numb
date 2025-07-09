import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {Container} from '@chakra-ui/react';

interface Props {
  className?: string;
}

export const FactPage = ({className}: Props) => {
  const location = useLocation();
  const {types, number, isRandom} = location.state || {};
  const [facts, setFacts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!types || !number) return;

    const fetchFacts = async () => {
      const results: Record<string, string> = {};

      for (const type of types) {
        const num = isRandom ? 'random' : number;
        const response = await fetch(
          `http://numbersapi.com/${num}/${type}?json`
        );
        const data = await response.json();
        results[type] = data.text;
      }

      setFacts(results);
    };

    fetchFacts();
  }, [types, number, isRandom]);

  return (
    <Container className={className}>
      <h1>Факты о числе {number === 'random' ? 'случайном' : number}</h1>
      {Object.entries(facts).map(([type, text]) => (
        <div key={type}>
          <h2>{type}:</h2>
          <p>{text}</p>
        </div>
      ))}
    </Container>
  );
};
