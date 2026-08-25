type VerifiedTestimonial = {
  quote: string;
  displayName: string;
  context: string;
};

// Populate only with student feedback that Strive has verified and has permission to publish.
const verifiedTestimonials: VerifiedTestimonial[] = [];

const shareExperienceUrl = "https://wa.me/263716730064?text=Hello%20Strive%2C%20I%20would%20like%20to%20share%20a%20review%20of%20my%20student%20journey%20with%20you.";

export default function VerifiedTestimonials() {
  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonialsIntro" data-reveal>
        <span>STUDENT TESTIMONIALS</span>
        <h2 id="testimonials-title">Experiences,<br /><em>in their own words.</em></h2>
        <p>Strive publishes a testimonial only after confirming the student, the wording, and permission to share it.</p>
      </div>
      {verifiedTestimonials.length ? (
        <div className="testimonialList" aria-label="Verified student testimonials">
          {verifiedTestimonials.map(testimonial => (
            <figure className="testimonialCard" key={`${testimonial.displayName}-${testimonial.context}`} data-reveal>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption><b>{testimonial.displayName}</b><span>{testimonial.context}</span></figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="testimonialPending" data-reveal>
          <span>VERIFIED FEEDBACK</span>
          <h3>Real reviews appear here once permission is confirmed.</h3>
          <p>Strive does not publish invented ratings, anonymous claims, or unconfirmed student feedback.</p>
          <a href={shareExperienceUrl} target="_blank" rel="noreferrer">Share your experience <span aria-hidden="true">↗</span></a>
        </div>
      )}
    </section>
  );
}
