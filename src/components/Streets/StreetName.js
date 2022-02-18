import useTranslator from '../../hooks/use-translator';

const StreetName = (props) => {
  const { details, place, shortname, onlytowns } = props;
  const { name, name_short, city, type, commune } = place;

  const mainName = shortname ? name_short : name;


  const myName = useTranslator(`names.${type}`, { place: mainName })
  const communeName = useTranslator(`names.gmina`, { commune })
  let result;
  if (onlytowns) {
    result = <div>
    <span className="street">{city}</span>{commune !== city && details ? <>, <span className="commune">{communeName}</span></> : null}
  </div>
  } else if (type !== 'wieś') {
    result = <div>
      <span className="street">{myName}</span>{city ? <>, <span className="city">{city}</span></>:null}{commune !== city && details ? <>, <span className="commune">{communeName}</span></> : null}
    </div>
  } else {
    result = <div>
      <span className="street">{myName}</span>{commune !== city && details ? <>, <span className="commune">{communeName}</span></> : null}
    </div>
  }

  return result;
};

export default StreetName;