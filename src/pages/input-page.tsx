import {Box, Container, Heading} from '@chakra-ui/react';

import {NumberFactForm} from '@/features';
import {cn, ROUTES} from '@/shared';
import {useNumberInputStore} from '@/shared/store';

interface Props {
  className?: string;
}

export const InputPage = ({className}: Props) => {
  const {
    type,
    number,
    isRandom,
    updateType,
    updateIsRandom,
    updateNumber,
    validate,
    error,
  } = useNumberInputStore();

  return (
    <Box
      className={cn(
        'min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm flex flex-col gap-3 justify-center items-center',
        className
      )}>
      <Heading>NUMB APP</Heading>
      <Container>
        <NumberFactForm
          navigatePath={ROUTES.fact}
          type={type}
          number={number}
          isRandom={isRandom}
          updateType={updateType}
          updateIsRandom={updateIsRandom}
          updateNumber={updateNumber}
          validate={validate}
          error={error}
        />
      </Container>
    </Box>
  );
};
