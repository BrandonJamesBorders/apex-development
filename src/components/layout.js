/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import tw from "twin.macro"

import "../styles/index.css";

import ApexLogo from "../images/apex-logo.svg" // Tell webpack this JS file uses this image

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introParagraph
            rotatingHeadlines
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <div
            css={[
                tw`min-h-screen`,
                `background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%) no-repeat center -64rem/128rem 128rem fixed,linear-gradient(180deg, #fafbff 0%, #d3dde9 100%) no-repeat top center/100% 65rem fixed,#d3dde9`
            ]}
        >
            <HelmetDatoCms
                favicon={data.datoCmsSite.faviconMetaTags}
                seo={data.datoCmsHome.seoMetaTags}
            />
            <div css={[
                tw`py-6 px-4 max-w-lg mx-auto max-w-screen-xl flex justify-between items-center`
              ]}
            >
                <div css={[
                    tw`pr-10`
                ]}>
                    <Link to="/home">
                        <img src={ApexLogo} css={[ tw`w-auto h-12` ]} alt="Apex Development" />
                    </Link>
                </div>
                <div css={[
                    tw`font-medium text-lg`
                ]}>
                    <nav>
                        <Link to="/services">Services</Link>
                        <Link css={[tw`px-10`]} to="/portfolio">Portfolio</Link>
                        <Link css={[tw`px-6 py-2 text-white shadow-lg rounded-md`, `background: #4A44F2`]} to="/contact">Contact</Link>
                    </nav>
                </div>
            </div>


            <div css={[
                tw`py-56 max-w-5xl mx-auto`,
                `font-family: 'Roboto Slab', serif;`
            ]}>
                <h1 css={[tw`font-black text-6xl`]}><span>Fort Wayne Web</span> Development.</h1>

                <div
                    css={[tw`pt-32 text-xl max-w-3xl`]}
                    className="body-text"
                    dangerouslySetInnerHTML={{
                        __html:
                            data.datoCmsHome.introParagraph
                    }}
                >

                </div>

                {/* <div className="container__sidebar">
                    <div className="sidebar">
                    <h6 className="sidebar__title">
                        <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                    </h6>
                    <div
                        className="sidebar__intro"
                        dangerouslySetInnerHTML={{
                        __html:
                            data.datoCmsHome.introTextNode.childMarkdownRemark.html
                        }}
                    />
                    <ul className="sidebar__menu">
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/about">About</Link>
                        </li>
                    </ul>
                    <p className="sidebar__social">
                        {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                        <a
                            key={profile.profileType}
                            href={profile.url}
                            target="blank"
                            className={`social social--${profile.profileType.toLowerCase()}`}
                        >
                            {" "}
                        </a>
                        ))}
                    </p>
                    <div className="sidebar__copyright">
                        {data.datoCmsHome.copyright}
                    </div>
                    </div>
                </div>
                <div className="container__body">
                    <div className="container__mobile-header">
                    <div className="mobile-header">
                        <div className="mobile-header__menu">
                        <button
                            onClick={e => {
                            e.preventDefault();
                            setShowMenu(!showMenu);
                            }}
                            aria-label="Show Menu"
                        />
                        </div>
                        <div className="mobile-header__logo">
                        <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                        </div>
                    </div>
                    </div>
                    {children}
                </div> */}
            </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
