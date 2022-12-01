import emoji from "node-emoji";

const Emoji = (props) => {
  const symbol = emoji.get(props.name);

  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.name}
      aria-hidden={false}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
