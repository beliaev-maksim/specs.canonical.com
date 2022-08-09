const Loader = () => {
  return (
    <section className="p-strip loader">
      <span
        className="u-align--center p-text--default"
        role="alert"
        aria-live="polite"
      >
        <i className="p-icon--spinner u-animation--spin" />
        <span>Loading...</span>
      </span>
    </section>
  );
};

export default Loader;
