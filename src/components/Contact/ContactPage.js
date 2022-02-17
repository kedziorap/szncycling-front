import MediaLink from './MediaLink';

import style from './ContactPage.module.scss';
import photo from '../../assets/p_kedziora.jpg';

import useTranslator from '../../hooks/use-translator';

const ContactPage = () => {
  const title = useTranslator('contact.title');
  const textParagraphs = useTranslator('contact.text');
  
  let text;
  if (textParagraphs !== '...') {
    text = textParagraphs.map((fragment, index) => <p key={index} dangerouslySetInnerHTML={{__html :fragment}} />);
  }
  return (
    <div>
      <h2>{title}</h2>
      <div className={style.description}>
        <div className={style.photo}>
          <img src={photo} alt="" />
        </div>
      {text}
      </div>
      <div className={style.media}>
        <div className={style.mediaElement}>
          <MediaLink
            type="mail"
            link="mailto:szczecinskicyklista@gmail.com"
            text="Szczeciński Cyklista"
          />
        </div>
        <div className={style.mediaElement}>
          <MediaLink
            type="instagram"
            link="https://www.instagram.com/kedziorres14"
            text="Instagram"
          />
        </div>
        <div className={style.mediaElement}>
          <MediaLink
            type="twitter"
            link="https://twitter.com/kedziorres14"
            text="Twitter"
          />
        </div>
        <div className={style.mediaElement}>
          <MediaLink
            type="facebook"
            link="https://www.facebook.com/szczecinskicyklista"
            text="Facebook"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
