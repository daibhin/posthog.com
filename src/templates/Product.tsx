import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import ProductLayout, {
    BlogPosts,
    Comparison,
    CTA,
    FeatureGrid,
    Hero,
    Roadmap,
    Sections,
    Testimonial,
} from 'components/ProductLayout'

import { Check as CheckIcon, Close as CloseIcon } from '../components/Icons'

const Check = (props) => <CheckIcon {...props} className="w-5" />
const Close = (props) => <CloseIcon {...props} className="w-5" />

export default function Product({ data, location }) {
    const { pageData, blogPosts, documentation } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const {
        title,
        subtitle,
        featuredImage,
        description,
        productFeatures,
        productSections,
        productTestimonial,
        productTeam,
        productCTA,
    } = pageData?.frontmatter

    const components = {
        Hero: (props) => <Hero {...props} title={title} subtitle={subtitle} featuredImage={featuredImage} />,
        FeatureGrid: (props) => <FeatureGrid {...props} features={productFeatures} />,
        Sections: (props) => <Sections {...props} sections={productSections} />,
        Testimonial: (props) => <Testimonial {...props} {...productTestimonial} />,
        Check,
        Close,
        Comparison: (props) => (
            <Comparison {...props} description={`How does PostHog ${title.toLowerCase()} compare?`} />
        ),
        BlogPosts: (props) => (
            <BlogPosts {...props} title={`Blog posts that mention ${title}`} posts={blogPosts?.edges} />
        ),
        Roadmap: (props) => (
            <Roadmap {...props} team={productTeam} subtitle={`Here's what the ${productTeam} Team is building next.`} />
        ),
        CTA: (props) => <CTA title={productCTA?.title} subtitle={productCTA?.subtitle} image={productCTA?.image} />,
    }

    return (
        <Layout>
            <SEO
                image={`/images/product/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />

            <ProductLayout title={title}>
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </ProductLayout>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String!, $blogTags: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                description
                productTeam
                productCTA {
                    title
                    subtitle
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                productTestimonial {
                    author {
                        name
                        role
                        image
                        company {
                            name
                            image
                        }
                    }
                    quote
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                productFeatures {
                    title
                    description
                }
                productSections {
                    title
                    subtitle
                    content
                    features {
                        title
                        description
                    }
                    image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                featuredImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        blogPosts: allMdx(filter: { frontmatter: { tags: { in: [$blogTags] } } }) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
