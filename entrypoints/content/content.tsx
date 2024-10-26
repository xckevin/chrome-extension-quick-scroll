import TopImg from '~/assets/top.png';
import BottomImg from '~/assets/bottom.png';

function Content() {
    const [isTopHover, setTopHover] = useState(false);
    const [isBottomHover, setBottomHover] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
    const baseStyle = {
        width: '30px',
        height: '30px',
        padding: '10px',
        margin: '5px',
        borderRadius: '10px',
        cursor: 'pointer',
    }
    const scrollToTopStyle = {
        ...baseStyle,
        opacity: isTopHover ? 1 : 0.2,
        backgroundColor: isTopHover ? '#efefef' : 'transparent',
    }
    const scrollToBottomStyle = {
        ...baseStyle,
        opacity: isBottomHover ? 1 : 0.2,
        backgroundColor: isBottomHover ? '#efefef' : 'transparent',
    }
    return (
        <div style={{ position: 'fixed', top: '50%', right: '10px', transform: 'translate(0, -50%)' }}>
            <div>
                <img style={scrollToTopStyle} onClick={scrollToTop} onMouseEnter={() => setTopHover(true)} onMouseLeave={() => setTopHover(false)} src={TopImg} alt='Go to top' />
            </div>
            <div>
                <img style={scrollToBottomStyle} onClick={scrollToBottom} onMouseEnter={() => setBottomHover(true)} onMouseLeave={() => setBottomHover(false)} src={BottomImg} alt='Go to bottom' />
            </div>
        </div>
    );
}
export default Content;