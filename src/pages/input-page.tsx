import {Box, Container, Heading} from '@chakra-ui/react';

import {NumberFactForm} from '@/features';
import {cn, ROUTES} from '@/shared';

interface Props {
  className?: string;
}

export const InputPage = ({className}: Props) => {
  return (
    <Box
      className={cn(
        'min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm flex flex-col gap-3 justify-center items-center',
        className
      )}>
      <Heading>NUMB APP</Heading>
      <Container>
        <NumberFactForm navigatePath={ROUTES.fact} />
      </Container>
    </Box>
  );
};
