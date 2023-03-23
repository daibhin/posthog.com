import Link from 'components/Link'
import React, { useState } from 'react'
import { SessionRecording, FeatureFlags, AbTesting } from 'components/ProductIcons'
import Layout from 'components/Layout'
import { BusinessModel } from 'components/NotProductIcons'
import { getImage, StaticImage } from 'gatsby-plugin-image'
import { Post } from '../Blog'
import TeamRoadmap from 'components/TeamRoadmap'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImage } from 'components/PostLayout/Contributors'
import { graphql, useStaticQuery } from 'gatsby'
import { CallToAction } from '../CallToAction'
import { Squeak } from 'squeak-react'
import Slider from 'react-slick'
import { useLocation } from '@reach/router'

const nav = [
    {
        label: 'Product analytics',
        url: '/product/product-analytics',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Session recording',
        url: '/product/session-recording',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Feature flags',
        url: '/product/feature-flags',
        icon: <FeatureFlags className="w-5" />,
    },
    {
        label: 'A/B testing',
        url: '/product/ab-testing',
        icon: <AbTesting className="w-5" />,
    },
    {
        label: 'CDP',
        url: '/product/cdp',
        icon: <SessionRecording className="w-5" />,
    },
]

const getTailwindGridCol = (length: number) => `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${length}`

export const FeatureGrid = ({ children, className = '' }: { children: React.ReactNode[]; className?: string }) => {
    const length = children?.length ?? 1
    return (
        <ul
            className={`grid list-none m-0 max-w-screen-2xl mx-auto border-l border-gray-accent-light border-dashed  ${getTailwindGridCol(
                length
            )} ${className}`}
        >
            {children}
        </ul>
    )
}

export const FeatureTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-base m-0 ${className}`}>{children}</h3>
)

export const FeatureDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`m-0 text-sm ${className}`}>{children}</p>
)

interface IFeature {
    title: string
    description: string
    icon?: React.ReactNode
}

export const Feature = ({ title, description, icon }: IFeature) => {
    return (
        <li className="p-6 pb-8 border-r border-gray-accent-light border-dashed">
            <BusinessModel className="w-5 h-5 mb-2" />
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureDescription>{description}</FeatureDescription>
        </li>
    )
}

export const FeatureList = ({ features }: { features: { title: string; description: string }[] }) => {
    return (
        <ul className="list-none m-0 p-0 space-y-4">
            {features.map(({ title, description }) => {
                return (
                    <li key={title}>
                        <FeatureTitle>{title}</FeatureTitle>
                        <FeatureDescription>{description}</FeatureDescription>
                    </li>
                )
            })}
        </ul>
    )
}

export const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string | React.ReactNode }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl m-0">{title}</h2>
            {subtitle && typeof subtitle === 'string' ? <p className="text-base m-0">{subtitle}</p> : subtitle}
        </div>
    )
}

export interface ITestimonial {
    featuresUsed: string[]
    author: {
        name: string
        role: string
        image: string
        company: {
            name: string
            image: string
        }
    }
    quote: string
}

export const Testimonial = ({ featuresUsed, author, quote }: ITestimonial) => {
    return (
        <div>
            <img className="text-black max-w-[200px]" src={author.company.image} />
            <p className="my-6">{quote}</p>
            <div className="flex space-x-4 items-center">
                <img className="rounded-full max-w-[50px]" src={author.image} />
                <div>
                    <p className="m-0 font-bold">{author.name}</p>
                    <p className="m-0 opacity-70">
                        {author.role}, {author.company.name}
                    </p>
                </div>
            </div>
        </div>
    )
}

export const TwoCol = ({ children, className = '' }: { children: React.ReactNode[]; className?: string }) => {
    return (
        <div className={`grid grid-cols-2 gap-x-6 ${className}`}>
            <div>{children[0]}</div>
            <div>{children[1]}</div>
        </div>
    )
}

export const PairsWith = ({ products }: { products: IFeature[] }) => {
    return (
        <div>
            <h2 className="text-center m-0">Pairs with...</h2>
            <p className="text-center m-0">PostHog products are natively designed to be interoperable.</p>
            <div className="border-y border-dashed border-gray-accent-light mt-12">
                <FeatureGrid>
                    {products.map((product) => {
                        const { title, description } = product
                        return <Feature key={title} title={title} description={description} />
                    })}
                </FeatureGrid>
            </div>
        </div>
    )
}

const Slide = ({ image, label }) => {
    return (
        <div className="relative group">
            <div className="hover:scale-[1.1] transition-transform relative active:scale-[1.09]">{image}</div>
            <div className="absolute left-0 bottom-4 right-0 group-hover:visible invisible flex justify-center">
                <span className="text-black bg-tan/75 backdrop-blur shadow-xl text-lg rounded-md px-3">{label}</span>
            </div>
        </div>
    )
}
const slides = [
    {
        label: 'Product analytics',
        url: 'product-analytics',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/product-analytics.png"
            />
        ),
    },
    {
        label: 'Session recording',
        url: 'session-recording',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/session-recording.png"
            />
        ),
    },
    {
        label: 'Feature flags',
        url: 'feature-flags',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/feature-flags.png"
            />
        ),
    },
    {
        label: 'A/B testing and experiments',
        url: 'ab-tests-and-experiments',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/experimentation.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/sql.png"
            />
        ),
    },
    {
        label: 'Event pipelines',
        url: 'event-pipelines',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/event-pipelines.png"
            />
        ),
    },
    {
        label: 'API',
        url: 'api',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/api.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-tree.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-tractor.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/data-warehouse.png"
            />
        ),
    },
    {
        label: 'Data warehouse',
        url: 'data-warehouse',
        image: (
            <StaticImage
                placeholder="none"
                loading="eager"
                quality={100}
                objectFit="contain"
                alt=""
                src="./images/hogs/warehouse-sync.png"
            />
        ),
    },
]

const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToScroll: 11,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 0,
    speed: 100000,
    cssEase: 'linear',
}

export const Footer = ({ title }) => {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <section className="text-center my-14">
            <h2 className="text-6xl m-0">PostHog does that.</h2>
            <p className="mt-2 mb-12">
                Now that you know PostHog does {title.toLowerCase()}, check out what else PostHog can do.
            </p>
            <Nav />
            <Slider
                beforeChange={(_oldIndex, newIndex) => setActiveSlide(newIndex)}
                className="product-hogs-slider"
                {...sliderSettings}
            >
                {slides.map((slide, index) => {
                    return (
                        <Link key={index} className="cursor-pointer" smooth duration={300} offset={-57} to={slide.url}>
                            <Slide {...slide} />
                        </Link>
                    )
                })}
            </Slider>
        </section>
    )
}

export const Section = ({
    children,
    className = 'max-w-5xl',
    border = false,
    borderPadding = true,
}: {
    children: React.ReactNode
    className?: string
    border?: boolean
    borderPadding?: boolean
}) => {
    return (
        <div
            className={`${
                border ? `${borderPadding ? 'py-14' : ''} border-y border-gray-accent-light border-dashed` : ''
            } my-14`}
        >
            <section className={`mx-auto ${className}`}>{children}</section>
        </div>
    )
}

export const PostHogVS = ({ description, children }: { description: string; children: React.ReactNode }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="m-0">PostHog vs...</h2>
                    <p className="m-0">{description}</p>
                </div>
                <div>
                    <StaticImage className="max-w-[530px]" alt="PostHog vs..." src="./images/vs.png" />
                </div>
            </div>
            <div className="overflow-x-auto article-content mt-12">{children}</div>
        </div>
    )
}

export const BlogPosts = ({ posts, title }) => {
    return (
        <div>
            <h3>{title}</h3>
            <ul className="list-none m-0 p-0 grid grid-cols-2 gap-4">
                {posts.map((post) => {
                    const {
                        node: {
                            id,
                            frontmatter: { date, title, featuredImage, authors, category },
                            fields: { slug },
                        },
                    } = post

                    return (
                        <li
                            className="relative active:top-[1px] active:scale-[.99] shadow-lg after:border-0 hover:after:border-1 after:border-black/25 after:rounded-md after:-inset-1.5 after:absolute"
                            key={id}
                        >
                            <Post
                                date={date}
                                title={title}
                                featuredImage={featuredImage}
                                authors={authors}
                                category={category}
                                slug={slug}
                                imgClassName="w-full"
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const Questions = () => {
    return (
        <div className="max-w-5xl">
            <h2>Questions?</h2>
            <Squeak
                apiHost={process.env.GATSBY_SQUEAK_API_HOST as string}
                organizationId={process.env.GATSBY_SQUEAK_ORG_ID as string}
            />
        </div>
    )
}

export const Roadmap = ({ subtitle, team }) => {
    const {
        team: { nodes },
    } = useStaticQuery(graphql`
        query {
            team: allMdx(
                filter: { fields: { slug: { regex: "/^/team/" } } }
                sort: { fields: frontmatter___startDate }
            ) {
                nodes {
                    frontmatter {
                        headshot {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                        team
                        jobTitle
                        name
                        country
                        github
                        teamLead
                        pineappleOnPizza
                    }
                }
            }
        }
    `)
    const teamMembers = nodes
        .filter((node) => node?.frontmatter?.team?.some((teamName) => teamName === team))
        .sort((l, r) => (l.frontmatter.teamLead ? -1 : r.frontmatter.teamLead ? 1 : 0))
    const teamLength = teamMembers?.length
    if (!teamMembers || !teamLength) return null
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (teamMembers.filter(({ frontmatter: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) * 100
        )
    const teamURL = `/handbook/small-teams/${team.toLowerCase()}`
    return (
        <div>
            <h3 className="m-0">Roadmap</h3>
            <p className="m-0">{subtitle}</p>
            <div className="mt-8 flex items-start space-x-8">
                <div>
                    <TeamRoadmap team={team} />
                </div>
                <div className="flex-shrink-0">
                    <p className="mb-4">
                        Here are the people who bring you
                        <br />
                        <strong>PostHog {team.toLowerCase()}</strong>
                    </p>
                    <ul className="list-none m-0 p-0">
                        {teamMembers.map((member) => {
                            const { name, headshot, jobTitle, teamLead, country } = member?.frontmatter
                            return (
                                <li className="!m-0 flex space-x-4 items-center py-2" key={name}>
                                    <figure className="mb-0">
                                        <ContributorImage className="w-[50px] h-[50px] " image={getImage(headshot)} />
                                    </figure>
                                    <div>
                                        <span className="flex items-center md:flex-row space-x-2">
                                            <p className="!text-lg !font-bold !m-0 !leading-none">{name}</p>
                                            {country && (
                                                <span className="!leading-none">
                                                    {country === 'world' ? (
                                                        '🌎'
                                                    ) : (
                                                        <ReactCountryFlag svg countryCode={country} />
                                                    )}
                                                </span>
                                            )}
                                            {teamLead && (
                                                <span className="inline-block border-2 border-red/50 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-red bg-white">
                                                    Team lead
                                                </span>
                                            )}
                                        </span>
                                        <p className="!text-sm !mb-0 opacity-50 !leading-none !mt-1">{jobTitle}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <p className="mt-4">
                        <strong>{pineapplePercentage}%</strong> of this team prefer pineapple on pizza
                    </p>
                    <CallToAction size="md" to={teamURL} type="outline">
                        Learn more about this team
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}

export const CTA = ({ title, subtitle, image }) => {
    return (
        <div className="flex space-x-4 justify-between p-12 bg-gray-accent-light rounded-lg items-center">
            <div>
                <h2 className="m-0">{title}</h2>
                <p className="m-0 mb-6">{subtitle}</p>
                <CallToAction to="https://app.posthog.com/signup">Get started - free</CallToAction>
            </div>
            <div className="max-w-[400px]">{image}</div>
        </div>
    )
}

interface IFeature {
    title: string
    description: string
}

interface IProps {
    title: string
    description: string | React.ReactNode
    image: React.ReactNode
    children: React.ReactNode
    showNav?: boolean
    showFooter?: boolean
}

const Nav = () => {
    const { pathname } = useLocation()
    return (
        <nav className="border-b border-gray-accent-light border-dashed relative z-10">
            <ul className="list-none m-0 flex items-center space-x-4 justify-center max-w-screen-2xl mx-auto">
                {nav.map((navItem) => {
                    const { label, url, icon } = navItem
                    console.log(url, pathname)
                    return (
                        <ke key={label}>
                            <Link
                                className={`py-4 px-2 flex space-x-2 items-center !text-black ${
                                    pathname === url ? 'border-b border-red' : ''
                                }`}
                                to={url}
                            >
                                <span>{icon}</span>
                                <span>{label}</span>
                            </Link>
                        </ke>
                    )
                })}
            </ul>
        </nav>
    )
}

export default function ProductLayout({
    title,
    description,
    image,
    children,
    showNav = true,
    showFooter = true,
}: IProps): JSX.Element {
    return (
        <div className="px-5 py-12">
            {showNav && <Nav />}
            <section>
                <h1 className="text-center text-5xl mb-0 mt-14">{title}? PostHog does that.</h1>
                <div className="text-center mt-4">{description}</div>
                <div className="max-w-screen-xl mx-auto my-14">{image}</div>
            </section>
            <div>{children}</div>
            {showFooter && <Footer title={title} />}
        </div>
    )
}
