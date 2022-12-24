const BUILD_YEAR = 2022;
const CURRENT_YEAR = new Date().getFullYear();

const Footer = (): JSX.Element => {
  let date;
  if (BUILD_YEAR !== CURRENT_YEAR) {
    date = `${BUILD_YEAR} - ${CURRENT_YEAR}`;
  } else {
    date = `${CURRENT_YEAR}`;
  }

  return (
    <footer>
      <p className="footer--copyright">© {date} Samuele Battistella</p>
      <p className="footer--powered-by">
        Powered by{' '}
        <a className="footer--link" href="https://www.thecocktaildb.com">
          www.thecocktaildb.com
        </a>{' '}
      </p>
    </footer>
  );
};

export default Footer;
