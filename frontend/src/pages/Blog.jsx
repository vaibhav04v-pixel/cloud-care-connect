import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button/Button';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

const Blog = () => {
    const navigate = useNavigate();

    return (
        <div className="blog-page">
            <div className="page-header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>Health & Wellness Blog</h1>
                        <p>Expert medical insights to help you live a healthier, longer life</p>
                    </motion.div>
                </div>
            </div>

            <div className="container page-content">
                <div className="blog-list">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="blog-card"
                            onClick={() => navigate(`/blog/${post.id}`)}
                        >
                            <div
                                className="blog-image-wrapper"
                                style={{
                                    backgroundImage: `url(${post.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <span className="blog-category">{post.category}</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">📅 {post.date}</span>
                                    <span className="blog-author">{post.author}</span>
                                </div>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="read-more-btn"
                                >
                                    Read Article
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-section" style={{ marginTop: '4rem', background: '#f8f9fa', padding: '4rem 0' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>Stay Updated with Health Tips</h2>
                        <p style={{ marginBottom: '2rem', color: '#666' }}>
                            Subscribe to our newsletter to receive the latest medical insights, seasonal care tips, and hospital news directly in your inbox.
                        </p>
                        <div className="newsletter-form" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    minWidth: '250px'
                                }}
                            />
                            <Button variant="primary" onClick={() => alert('Subscribed!')}>Subscribe</Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
