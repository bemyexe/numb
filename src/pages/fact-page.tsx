import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {
  Box,
  Button,
  Container,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';

import type {NumberDto} from '@/@types/types.dto';
import {cn, ROUTES} from '@/shared';
import {useNumberInputStore} from '@/shared/store';

interface Props {
  className?: string;
}

export const FactPage = ({className}: Props) => {
  const {type, number, isRandom} = useNumberInputStore();

  const [fact, setFact] = useState<NumberDto | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!type || !number) return;

    const fetchFacts = async () => {
      try {
        setisLoading(true);
        setError(false);
        const response = await fetch(
          `http://numbersapi.com/${number}/${type}?json`
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
  }, [type, number]);

  if (!type || !number) {
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
      <Heading>Fact about {isRandom ? 'random' : 'your'} number.</Heading>
      <Container maxW={'xs'}>
        <Text>TYPE: {fact?.type}</Text>
        <Text>NUMBER: {fact?.number}</Text>
        <Text>FACT: {fact?.text}</Text>
      </Container>
      <Button onClick={() => navigate(ROUTES.app)}>Another one?</Button>
    </Box>
  );
};
