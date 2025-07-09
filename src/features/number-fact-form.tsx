import {type FormEvent, useState} from 'react';
import {useNavigate} from 'react-router';
import {
  Box,
  Button,
  CheckboxCard,
  createListCollection,
  Field,
  NumberInput,
  Portal,
  Select,
} from '@chakra-ui/react';

import { cn } from '@/shared';

interface Props {
  className?: string;
  navigatePath: string;
}

const OPTIONS = createListCollection({
  items: [
    {value: 'trivia', label: 'Trivia'},
    {value: 'math', label: 'Math'},
    {value: 'date', label: 'Date'},
    {value: 'year', label: 'Year'},
  ],
});

export const NumberFactForm = ({className, navigatePath}: Props) => {
  const [type, setType] = useState<string[]>([]);
  const [number, setNumber] = useState('');
  const [checked, setChecked] = useState(false);
  const [errorType, setErrorType] = useState('');
  const [errorNumber, setErrorNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorType('');
    setErrorNumber('');

    if (!type.length) {
      setErrorType('Select at least one type');
      return;
    }

    if (!checked && !number) {
      setErrorNumber('Enter a number or choose a random');
      return;
    }

    navigate(navigatePath, {
      state: {
        types: type,
        number: checked ? 'random' : number,
        isRandom: checked,
      },
    });
  };

  return (
    <Box className={cn('flex flex-col gap-4', className)} as={'form'} onSubmit={handleSubmit}>
      <Field.Root invalid={!!errorType}>
        <Select.Root
          collection={OPTIONS}
          value={type}
          onValueChange={(e) => setType(e.value)}>
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select type" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {OPTIONS.items.map((type) => (
                  <Select.Item item={type} key={type.value}>
                    {type.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        <Field.ErrorText>{errorType}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errorNumber}>
        <NumberInput.Root
          w="full"
          disabled={checked}
          value={number}
          onValueChange={(e) => setNumber(e.value)}>
          <NumberInput.Control />
          <NumberInput.Input placeholder="Select number" />
        </NumberInput.Root>
        <Field.ErrorText>{errorNumber}</Field.ErrorText>
      </Field.Root>

      <CheckboxCard.Root
        checked={checked}
        onCheckedChange={(e) => {
          setChecked(!!e.checked);
        }}
        >
        <CheckboxCard.HiddenInput/>
        <CheckboxCard.Control>
          <CheckboxCard.Label>Random</CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>

      <Button type="submit">Let's go!</Button>
    </Box>
  );
};
