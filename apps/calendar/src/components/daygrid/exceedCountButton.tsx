import { FunctionComponent, h } from 'preact';

import Template from '@src/components/template';

interface Props {
  number: number;
  clickHandler: () => void;
  className: string;
}

const ExceedCountButton: FunctionComponent<Props> = ({ number, clickHandler, className }) => {
  if (!number) {
    return null;
  }

  return (
    <button type="button" onClick={clickHandler} className={className}>
      <Template template="monthGridHeaderExceed" model={number} />
    </button>
  );
};

export default ExceedCountButton;