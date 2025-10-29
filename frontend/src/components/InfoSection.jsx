import "@styles/InfoSection.scss";

const InfoSection = ({ icon, title, children }) => (
    <>
        <div className="details__custom__section">
            <div className="details__custom__section__subtitle">
                <span className="icon material-icons-round">{icon}</span>
                <h4>{title}</h4>
            </div>
            <div className="details__custom__section__content">{children}</div>
        </div>
        <hr className="divider" />
    </>
);

export default InfoSection;
