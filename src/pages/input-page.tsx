import {Box, Container} from '@chakra-ui/react';

import {NumberFactForm} from '@/features';
import {cn, ROUTES} from '@/shared';

interface Props {
  className?: string;
}

export const InputPage = ({className}: Props) => {
  return (
    <Box className={cn("min-w-xs min-h-[500px] bg-neutral-900 py-3 rounded-sm", className)}>
      <Container>
        <NumberFactForm navigatePath={ROUTES.fact} />
        </Container>
    </Box>
  );
};
