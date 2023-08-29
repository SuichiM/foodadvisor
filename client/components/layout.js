import ClosableMessage from '../components/message';
import delve from 'dlv';
import Footer from './global/Footer';
import Navbar from './global/Navbar';
import PreviewBanner from './global/PreviewBanner';
import { useGlobalContext } from '../context/global';
import Seo from './seo';

const Layout = ({ children, global, pageData, preview, type }) => {
  const { messages, dimissMessage } = useGlobalContext();

  return (
    <div>
      <Seo seo={delve(pageData, 'attributes.seo')} />
      {preview && <PreviewBanner />}
      <Navbar {...global} pageData={pageData} type={type} />
      {messages.length > 0 && (
        <div className="p-4">
          {messages.map(({ content, type, id }) => {
            return (
              <ClosableMessage
                key={id}
                message={content}
                type={type}
                onClose={() => dimissMessage(id)}
              />
            );
          })}
        </div>
      )}
      {children}
      <Footer {...global} pageData={pageData} />
    </div>
  );
};

export default Layout;
