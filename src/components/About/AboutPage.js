import useTranslator from '../../hooks/use-translator';

const AboutPage = () => {
  const header = useTranslator('about.title');
  const textParagraphs = useTranslator('about.text');
  let text;
  if (textParagraphs !== '...') {
    text = textParagraphs.map((fragment, index) => <p key={index} dangerouslySetInnerHTML={{__html :fragment}} />);
  }
  return (
    <div>
      <h2>{header}</h2>
      {text}
    </div>
  )
}

export default AboutPage;