export const ButtonIcon = ({
  text,
  type = "primary",
  func = () => {},
  hint,
  Icon,
}: {
  text: string;
  func?: any;
  hint: string;
  Icon: React.ElementType;
  type?: string;
}) => {
  return (
    <button className={type} title={hint} onClick={() => func()}>
      {text}
      <Icon />
    </button>
  );
};
