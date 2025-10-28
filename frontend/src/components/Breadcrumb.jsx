import "@styles/Breadcrumb.scss";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav aria-label="breadcrumb" className="breadcrumb">
            <ol>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.href ? (
                        <a href={item.href}>{item.label}</a>
                        ) : (
                        <span className="bold" aria-current="page">
                            {item.label}
                        </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
