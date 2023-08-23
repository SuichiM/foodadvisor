/* login page with graphql and reactquery*/

import React, { useState } from 'react';
import delve from 'dlv';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { getStrapiURL, getData } from '../../utils';
import { getLocalizedParams } from '../../utils/localize';
import { useAuthContext } from '../../context/auth';
import { useQueryClient } from 'react-query';
import Header from '../../components/shared/Header';

const Login = ({ pageData }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuthContext();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const header = delve(pageData, 'attributes.header');
  const forgotLink = delve(pageData, 'attributes.forgotLink');
  const registerLink = delve(pageData, 'attributes.registerLink');

  const loginButtonText = delve(pageData, 'attributes.loginButtonText');
  const dividerText = delve(pageData, 'attributes.dividerText');

  const formFields = delve(pageData, 'attributes.form');
  const emailFieldProps = formFields.find(
    (field) => field.name === 'identifier'
  );
  const passwordFieldProps = formFields.find(
    (field) => field.name === 'password'
  );

  const mutation = useMutation(
    async () => {
      const res = await fetch(getStrapiURL('/auth/local'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      const { user, jwt } = data;

      login(jwt, user);

      if (res.ok) {
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('global');
        router.push('/');
      } else {
        const message = data?.error?.message || 'Oops, something went wrong!';

        setErrors([message]);
      }
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('user');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <Header {...header} />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="identifier" className="sr-only">
                {emailFieldProps['label']}
              </label>
              <input
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="identifier"
                name={emailFieldProps['name']}
                type={emailFieldProps['type']}
                autoComplete="email"
                required
                placeholder={emailFieldProps['placeholder']}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {passwordFieldProps['label']}
              </label>
              <input
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="password"
                name={passwordFieldProps['name']}
                type={passwordFieldProps['type']}
                autoComplete="current-password"
                required
                placeholder={passwordFieldProps['placeholder']}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* errors section */}
          {errors.length > 0 && (
            <div className="text-red-500">
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href={forgotLink['href']}>
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  {forgotLink['label']}
                </a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loginButtonText}
            </button>
          </div>
        </form>
        {/* divider */}
        <div className="flex items-center justify-between">
          <div className="w-1/5 border-t border-gray-300"></div>
          <div className="text-sm text-gray-500">{dividerText}</div>
          <div className="w-1/5 border-t border-gray-300"></div>
        </div>

        {/* register link */}
        <div>
          <Link href={registerLink['href']}>
            <a className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-secondary border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {registerLink['label']}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const { locale } = getLocalizedParams(context.query);
  const data = getData(
    null,
    locale,
    'login-page',
    'singleType',
    context.preview
  );

  try {
    const resBlogPage = await fetch(delve(data, 'data'));
    const blogPage = await resBlogPage.json();

    return {
      props: {
        pageData: blogPage.data,
        locale,
        preview: context.preview || null,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default Login;
