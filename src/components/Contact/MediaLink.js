const MediaLink = (props) => {
  const { type, link, text } = props;
  return (
    <a href={link} target="_blank" title={text} rel="noreferrer">
      <i className={`icon-${type}`} />
    </a>
  );
};

export default MediaLink;
