import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import 'prismjs/themes/prism-okaidia.css';
import '../../../../mynpms/react-website-themes/packages/side-nav/src/styles/variables';
import '../../../../mynpms/react-website-themes/packages/side-nav/src/styles/global';

import Article from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Article';
import Branding from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Branding';
import Footer from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Footer';
import Header from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Header';
import Heading from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Heading';
import Layout from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Layout';
import List from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/List';
import Menu from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Menu';
import Seo from '../../../../mynpms/react-website-themes/packages/side-nav/src/components/Seo';

import TagIcon from 'react-feather/dist/icons/tag';
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up';
import CalendarIcon from 'react-feather/dist/icons/calendar';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';
import logo from 'content/images/logo.png';

const actionIcons = {
  toTop: ArrowUpIcon,
};

const PageTemplate = props => {
  const {
    pageContext: { category },
    data: {
      posts: { totalCount, edges },
      footerLinks: { html: footerLinksHTML },
      copyright: { html: copyrightHTML },
    },
  } = props;

  const items = edges.map(edge => edge.node);

  const {
    headerTitle,
    headerSubTitle,
    siteUrl,
    siteDescription,
    siteLanguage,
    siteTitlePostfix,
    timeOffset,
  } = config;

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} logo={logo} />
        <Menu items={menuItems} actionIcons={actionIcons} />
      </Header>
      <Article>
        <Heading>
          <span>
            Posts in category <TagIcon />
          </span>
          <h1>{category}</h1>
          <p className="meta">
            There {totalCount > 1 ? 'are' : 'is'} <strong>{totalCount}</strong>{' '}
            post
            {totalCount > 1 ? 's' : ''} in the category.
          </p>
        </Heading>
        <List items={items} icon={CalendarIcon} timeOffset={timeOffset} />
      </Article>
      <Footer links={footerLinksHTML} copyright={copyrightHTML} />
      <Seo
        url={`${siteUrl}/categories/${category}/`}
        language={siteLanguage}
        title={`Posts in category: ${category}${siteTitlePostfix}`}
        description={siteDescription}
      />
    </Layout>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query CategoryTemplateQuery($category: String!) {
    posts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            prefix
          }
          excerpt
          timeToRead
          frontmatter {
            title
            categories
          }
        }
      }
    }
    footerLinks: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/footerLinks/" }
    ) {
      html
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
  }
`;
