import PropTypes from 'prop-types';
import './pageContent.css';
//estructura
const PageContent = ({children, headerTitle = '', actions = []}) => {
return (
    <div className='page-content'>
        <header className='header-content'>
            <div>
                <h2>{headerTitle}</h2>
            </div>
            <div className='actions-margin'>
                {[...actions]}
            </div>
        </header>
        <main className='main-content'>
            {children}
        </main>
    </div>
)
}
PageContent.propTypes = {
    children: PropTypes.node,         
    headerTitle: PropTypes.string,    
    actions: PropTypes.arrayOf(PropTypes.node), 
};

export default PageContent;