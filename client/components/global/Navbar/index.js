import { useAuthContext } from '../../../context/auth';

import delve from 'dlv';
import Cta from './cta';
import LocalSwitch from './localSwitch';
import Logo from './logo';
import Nav from './nav';
import LoginButton from './loginButton';
import UserMenu from './userMenu';

import GitHubButton from 'react-github-btn';

const Navigation = ({ navigation, pageData, type }) => {
  const { isAuthenticated, user, logout } = useAuthContext();

  const logoutUser = () => {
    logout();
  };

  return (
    <header className="text-gray-600 bg-white body-font border-b-2">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <Logo
          button={delve(navigation, 'leftButton')}
          locale={delve(pageData, 'attributes.locale')}
        />
        <Nav
          links={delve(navigation, 'links')}
          locale={delve(pageData, 'attributes.locale')}
        />
        {delve(navigation, 'rightButton') && (
          <div className="flex mx-auto">
            <div className="mx-1 my-auto px-2 hidden lg:block">
              <GitHubButton
                href="https://github.com/strapi/foodadvisor"
                data-show-count="true"
                data-size="large"
                aria-label="Star strapi/foodadvisor on GitHub"
              >
                Star
              </GitHubButton>
            </div>
            <Cta
              href={delve(navigation, 'rightButton.href')}
              target={delve(navigation, 'rightButton.target')}
              label={delve(navigation, 'rightButton.label')}
            />
          </div>
        )}
        <div className="flex ">
          <LocalSwitch pageData={pageData} type={type} />

          {isAuthenticated ? (
            <div>
              <UserMenu
                locale={delve(pageData, 'attributes.locale')}
                username={delve(user, 'username')}
                onLogout={logoutUser}
              />
            </div>
          ) : (
            <div>
              <LoginButton
                href={delve(navigation, 'loginButton.href')}
                locale={delve(pageData, 'attributes.locale')}
                target={delve(navigation, 'loginButton.target')}
                label={delve(navigation, 'loginButton.label')}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Navigation.defaultProps = {};

export default Navigation;
