import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {
  Box,
  Button,
  Container,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';

import type {NumberDto, State} from '@/@types/types.dto';
import {cn, ROUTES} from '@/shared';

interface Props {
  className?: string;
}

export const FactPage = ({className}: Props) => {
  const location = useLocation();
  const state: State = location.state;
  const [fact, setFact] = useState<NumberDto | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) return;

    const fetchFacts = async () => {
      try {
        setisLoading(true);
        setError(false);
        const response = await fetch(
          `https://numbersapi.com/${state.number}/${state.type}?json`
        );
        const data: NumberDto = await response.json();
        setFact(data);
      } catch {
        setError(true);
      } finally {
        setisLoading(false);
      }
    };

    fetchFacts();
  }, [state]);

  if (!location.state) {
    return (
      <Box
        className={cn(
          'min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm flex flex-col gap-3 justify-center items-center',
          className
        )}>
        <Text>Please fill out the form.</Text>
        <Button onClick={() => navigate(ROUTES.app)}>Fill out the form.</Button>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        className={cn(
          'min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm flex justify-center items-center',
          className
        )}>
        <Skeleton width="200px" height="200px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className={cn(
          'min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm flex flex-col gap-3 justify-center items-center',
          className
        )}>
        <Text>Error. Something happened...</Text>
        <Button onClick={() => navigate(ROUTES.app)}>Try again!</Button>
      </Box>
    );
  }

  return (
    <Box
      className={cn(
        'min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm flex flex-col gap-3 justify-center items-center',
        className
      )}>
      <Heading>Fact about {state.isRandom ? 'random' : 'your'} number.</Heading>
      <Container maxW={'xs'}>
        <Text>TYPE: {fact?.type}</Text>
        <Text>NUMBER: {fact?.number}</Text>
        <Text>FACT: {fact?.text}</Text>
      </Container>
      <Button onClick={() => navigate(ROUTES.app)}>Another one?</Button>
    </Box>
  );
};
