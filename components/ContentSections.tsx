"use client";
import React, { useEffect } from "react";
import ChatWidget from "./ChatWidget";
import Slideshow from "./Slideshow";
import Videoshow from "./Videoshow";
import TextDq from "./TextDq";
import Contact from "./Contact";
import CookieConsent from "./CookieConsent";
const enrg = '/assets/enrg.webp';
const image4 = '/assets/image4.webp';
const image5 = '/assets/image5.webp';
const image06 = '/assets/image06.webp';
const image7 = '/assets/image7.webp';
const image8 = '/assets/image8.webp';
const book = '/assets/book.webp';
const x10 = '/assets/x10.webp';
const gpt01 = '/assets/gpt01.webp';
const gemini01 = '/assets/gemini01.webp';
const copilot01 = '/assets/copilot01.webp';
const AI = '/assets/AI.webp';

export default function ContentSections() {
  const section1 = (
    <>
      <section>
        <h1 className="bb7">
          <a
            className="loadicon010101"
            href="https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment"
            target="_parent"
            rel="noreferrer"
          >
            12 ways you can protect the environment
          </a>
        </h1>
        <img
          className="iiim"
          src={image4}
          alt="env-image"
          width={400}
          height={224}
        />
        <p className="b3">
          Most of the damage to our environment stems from consumption: what we
          consume, how much we consume and how often. Whether its gas,food,
          clothing, cars, furniture, water, toys, electronics, knick-knacks or
          other goods, we are all consumers. The key is not to stop consuming,
          but to start being mindful of our consumption habits and how each
          purchase or action affects the ecosystem. The good news is that its
          often not too difficult, expensive, or inconvenient to become more
          environmentally friendly. It can even be a fun challenge to implement
          among your family or coworkers. And though small changes at the
          individual level may seem trivial, just think how much cleaner the
          planet would be If everyone adopts behavior modification.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment"
              target="_parent"
            >
              (continued..)
            </a>
          </i>
        </p>
      </section>
    </>
  );

  const section2 = (
    <>
      <section>
        <h2 className="bb7">
          <a
            className="loadicon010101"
            href="https://www.un.org/en/climatechange/raising-ambition/renewable-energy"
            target="_parent"
            rel="noreferrer"
          >
            Renewable energy
          </a>
        </h2>
  <img className="iiim" src={enrg} alt="energ-image" width={400} height={224} />
        <p className="b3">
          Renewable energy is energy derived from natural sources that are
          replenished at a higher rate than they are consumed. Sunlight and
          wind, for example, are such sources that are constantly being
          replenished. Renewable energy sources are plentiful and all around us.
          Fossil fuels - coal, oil and gas - on the other hand, are
          non-renewable resources that take hundreds of millions of years to
          form. Fossil fuels, when burned to produce energy, cause harmful
          greenhouse gas emissions, such as carbon dioxide. Generating renewable
          energy creates far lower emissions than burning fossil fuels.
          Transitioning from fossil fuels, which currently account for the
          lions share of emissions, to renewable energy is key to addressing
          the climate crisis. Renewables are now cheaper in most countries, and
          generate three times more jobs than fossil fuels.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://www.un.org/en/climatechange/raising-ambition/renewable-energy"
              target="_parent"
            >
              {" "}
              (continued..){" "}
            </a>
          </i>
        </p>
      </section>
    </>
  );

   const section3 = (
    <>
      <section>
        <h2 className="bb7">
          <a
            className="loadicon010101"
            href="https://www.aroundrobin.com/importance-of-social-justice/"
            target="_parent"
            rel="noreferrer"
          >
            The importance of social justice
          </a>
        </h2>
        <img
          className="iim"
          src={image5}
          alt="socil-image"
          width={300}
          height={192}
        />
        <p className="b3">
          We are living in an era of contradictions. While we should focus on
          building a unified approach towards fighting a global pandemic, we are
          more divided than ever. We are more connected than ever before in
          human history, yet are unable to understand the plight of others. We
          see an evolution of human rights, but see no end to conflict. We are
          more willing to accept differences, yet discrimination is on the rise.
          We are living in an era where we have greater freedoms than ever
          before, yet we see no end to injustice. So where do we go from here?
          Is there a way to heal the world? Social justice may be the answer.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://www.aroundrobin.com/importance-of-social-justice/"
              target="_parent"
            >
              (continued..)
            </a>
          </i>
        </p>
      </section>

      <section>
        <h2 className="bb7 animate0110">
          <a
            className="loadicon010101"
            href="https://womenshealth.gov/relationships-and-safety/domestic-violence/effects-domestic-violence-children"
            target="_parent"
            rel="noreferrer"
          >
            Effects of domestic violence on children
          </a>
        </h2>
        <img
          className="iim animate0110"
          src={image06}
          alt="image002"
          width={300}
          height={200}
        />
        <p className="b3 animate0110">
          Many children exposed to violence in the home are also victims of
          physical abuse.One: Children who witness domestic violence or are
          victims of abuse themselves are at serious risk for long-term physical
          and mental health problems.two: Children who witness violence between
          parents may also be at greater risk of being violent in their future
          relationships. If you are a parent who is experiencing abuse, it can
          be difficult to know how to protect your child.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://womenshealth.gov/relationships-and-safety/domestic-violence/effects-domestic-violence-children"
              target="_parent"
            >
              {" "}
              (continued..){" "}
            </a>
          </i>
        </p>
      </section>
    </>
  );

  const section4 = (
    <>
      <section>
        <h2 className="bb7">
          <a
            className="loadicon010101"
            href="https://riseservicesinc.org/news/5-stages-child-development/#:~:text=Other%20scholars%20describe%20six%20stages,%2C%20school%20age%2C%20and%20adolescents."
            target="_parent"
            rel="noreferrer"
          >
            What are the 5 stages of child development
          </a>
        </h2>
        <img
          className="iim"
          src={image7}
          alt="image0378"
          width={300}
          height={142}
        />
        <p className="b3">
          Children change rapidly as they grow. Many of these changes are
          physical. Other changes are cognitive, which means the changes affect
          the way children think and learn. Child development often occurs in
          stages, with the majority of children hitting specific developmental
          landmarks by the time they reach a certain age.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://riseservicesinc.org/news/5-stages-child-development/#:~:text=Other%20scholars%20describe%20six%20stages,%2C%20school%20age%2C%20and%20adolescents."
              target="_parent"
            >
              (continued..)
            </a>
          </i>
        </p>
      </section>

      <section>
        <h2 className="bb7 animate0110">
          <a
            className="loadicon010101"
            href="https://caringforkids.cps.ca/handouts/mentalhealth/mental_health"
            target="_parent"
            rel="noreferrer"
          >
            Your child’s mental health
          </a>
        </h2>
        <img
          className="iim animate0110"
          src={image8}
          alt="image04g"
          width={300}
          height={200}
        />
        <p className="b3 animate0110">
          Mental health affects the way people think, feel and act. Taking care
          of our mental health is just as important as having a healthy body. As
          a parent, you play an important role in your childs mental health.
          You can promote good mental health by the things you say and do, and
          through the environment you create at home. You can also learn about
          the early signs of mental health problems and know where to go for
          help.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://caringforkids.cps.ca/handouts/mentalhealth/mental_health"
              target="_parent"
            >
              (continued..)
            </a>
          </i>
        </p>
      </section>
    </>
  );

  const section5 = (
    <>
      <a
        className="loadicon010101"
        href="https://a.co/d/b9zan5D"
        target="_parent"
        rel="noreferrer"
      >
        <img
          src={book}
          alt="Description of Image01"
          className="image208 animate0110"
          width={100}
          height={160}
        />
      </a>
      <div className="text208 animate0110">
        <h2 className="h208">
          <a
            className="loadicon010101"
            href="https://a.co/d/b9zan5D"
            target="_parent"
            rel="noreferrer"
          >
            Quantum computing
          </a>
        </h2>
        <p className="p208">A short book about quantum computing.</p>
      </div>
    </>
  );

  const section6 = (
    <>
      <section>
        <h2 className="bb7 animate0110">
          <a
            className="loadicon010101"
            href="https://x10hosting.com/"
            target="_parent"
            rel="noreferrer"
          >
            Free Web hosting
          </a>
        </h2>
        <img
          className="iiim0 animate0110"
          src={x10}
          alt="image0a057"
          width={400}
          height={100}
        />
        <p className="b3 animate0110">
          10+ Years Industry Veteran We&apos;ve been around for a long time and we&apos;re
          here to stay. Rest assured that we know how to provide a stable,
          high-performance web hosting service that isn&apos;t going to close
          overnight. We believe that hosting should be accessible to all, and
          that&apos;s precisely why we offer free hosting for everyone. We even give
          you unmetered bandwidth and disk space? allowing your site to grow
          without fear of ridiculously low limits like our other free hosting
          competitors! You won&apos;t find many companies doing that free of charge.
          <i>to visit the official website click here</i>
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://x10hosting.com/"
              title="https://x10hosting.com/"
              target="_parent"
            >
              x10hosting
            </a>
          </i>
        </p>
      </section>
    </>
  );

  const section7 = (
    <>
      <section>
        {" "}
        <h2 className="bb7">
          {" "}
          <a
            className="loadicon010101"
            href="https://youtu.be/nWkAatonIdk"
            target="_parent"
          >
            {" "}
            Artificial Intelligence{" "}
          </a>{" "}
        </h2>{" "}
        <a
          className="loadicon010101"
          href="https://youtu.be/nWkAatonIdk"
          target="_parent"
        >
          {" "}
          <img
            className="iiim"
            src={AI}
            alt="Artificial Intelligence illustration"
            width={400}
            height={224}
          />{" "}
        </a>{" "}
        <div className="container010101">
          {" "}
          <h2 className="h2010101"> Defining Artificial Intelligence </h2>{" "}
          <p className="p010101">
            {" "}
            Artificial intelligence (AI) is a broad field of computer science
            that aims to create systems capable of performing tasks that
            typically require human intelligence. This includes activities like:{" "}
          </p>{" "}
          <ul className="ul010101">
            {" "}
            <li>
              {" "}
              <strong> Learning: </strong> Acquiring new information and rules
              for using it.
            </li>{" "}
            <li>
              {" "}
              <strong> Reasoning: </strong> Using rules to reach approximate or
              definite conclusions.
            </li>{" "}
            <li>
              {" "}
              <strong> Problem-solving: </strong> Finding solutions to complex
              challenges.{" "}
            </li>{" "}
            <li>
              {" "}
              <strong> Perception: </strong> Interpreting sensory information
              (like images or sound).{" "}
            </li>{" "}
            <li>
              {" "}
              <strong> Natural language understanding: </strong> Communicating
              and interacting with humans through language.{" "}
            </li>{" "}
          </ul>{" "}
          <h2 className="h20101012"> Key Concepts in AI </h2>{" "}
          <ul className="ul010101">
            <li>
              <strong>Machine Learning:</strong>A subset of AI that focuses on
              algorithms that allow computers to learn from data without
              explicit programming. This includes techniques like:
              <ul>
                <li>
                  <strong>Supervised learning:</strong>Training models on
                  labeled data (e.g., classifying images).
                </li>
                <li>
                  <strong>Unsupervised learning:</strong>Finding patterns and
                  structures in unlabeled data (e.g., customer segmentation).
                </li>
                <li>
                  <strong>Reinforcement learning:</strong>Training agents to
                  make decisions by rewarding desired behaviors.
                </li>
              </ul>
            </li>
            <li>
              <strong>Deep Learning: </strong>A type of machine learning that
              uses artificial neural networks with multiple layers to analyze
              complex patterns in data. Deep learning has revolutionized fields
              like image recognition, natural language processing, and speech
              recognition.
            </li>
            <li>
              <strong>Natural Language Processing (NLP):</strong>The ability of
              computers to understand, interpret, and generate human language.
              This includes tasks like:
              <ul>
                <li>
                  <strong>Translation:</strong>Converting text from one language
                  to another.
                </li>
                <li>
                  <strong>Sentiment analysis:</strong>Determining the emotional
                  tone of text.
                </li>
                <li>
                  <strong>Chatbots:</strong>Interacting with users through
                  conversation.
                </li>
              </ul>
            </li>
          </ul>
          <h2 className="h20101012">Applications of AI</h2>
          <p className="p010101">AI is rapidly transforming various sectors:</p>
          <ul className="ul010101">
            <li>
              <strong>Healthcare:</strong>Diagnosing diseases, developing new
              drugs, personalizing treatment plans.
            </li>
            <li>
              <strong>Finance:</strong>Fraud detection, algorithmic trading,
              credit scoring.
            </li>
            <li>
              <strong>Transportation:</strong>Self-driving cars, traffic
              optimization, logistics.
            </li>
            <li>
              <strong>Customer service:</strong>Chatbots, virtual assistants,
              personalized recommendations.
            </li>
            <li>
              <strong>Entertainment:</strong>Game development, content creation,
              personalized streaming.
            </li>
          </ul>
          <h2 className="h20101012">The Future of AI</h2>
          <p className="p010101">
            AI is an evolving field with significant potential. Continued
            research and development will likely lead to even more sophisticated
            AI systems with broader applications. However, its crucial to
            address ethical considerations, such as bias, job displacement, and
            the responsible use of AI.{" "}
          </p>{" "}
        </div>{" "}
      </section>
    </>
  );

  const section10 = (
    <>
      <div className="ai-card">
        <img src={gpt01} alt="ChatGPT Logo" width={50} height={50} />
        <h3>ChatGPT</h3>
        <p>Smart assistant for programming, writing, and imaginative ideas.</p>
        <a href="https://chat.openai.com/" target="_parent" rel="noreferrer">
          Try it now
        </a>
      </div>
      <div className="ai-card">
        <img src={gemini01} alt="Gemini Logo" width={50} height={50} />
        <h3>Gemini</h3>
        <p>
          Artificial intelligence for creativity, search, and images from
          Google.
        </p>
        <a href="https://gemini.google.com/" target="_parent" rel="noreferrer">
          Try it now
        </a>
      </div>
      <div className="ai-card">
        <img src={copilot01} alt="Copilot Logo" width={50} height={50} />
        <h3>Copilot</h3>
        <p>Intelligent assistant in Windows and Office, from Microsoft.</p>
        <a
          href="https://copilot.microsoft.com/"
          target="_parent"
          rel="noreferrer"
        >
          Try it now
        </a>
      </div>
    </>
  );

  // ... other sections omitted for brevity in this generated copy (keeps original behavior)

  useEffect(() => {
    const selector = ".animate0110";

    function applyVisibleStyles(el: Element) {
      try {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      } catch (err) { console.debug('ContentSections applyVisibleStyles error', err); }
    }

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  applyVisibleStyles(entry.target);
                  try {
                    obs.unobserve(entry.target);
                  } catch (err) { console.debug('ContentSections unobserve error', err); }
                }
              });
        },
        { root: null, rootMargin: "0px", threshold: 0.05 }
      );

      try {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => observer.observe(el));
      } catch (err) { console.debug('ContentSections observer observe error', err); }

      return () => {
        try {
          observer.disconnect();
        } catch (err) { console.debug('ContentSections observer disconnect error', err); }
      };
    } else {
      const onScroll = () => {
        const elements = document.querySelectorAll(selector);
        const windowHeight = window.innerHeight;

        elements.forEach((element) => {
          const position = element.getBoundingClientRect().top;

          if (position < windowHeight) {
            applyVisibleStyles(element);
          }
        });
      };

      document.addEventListener("scroll", onScroll);
      onScroll();

      return () => {
        try {
          document.removeEventListener("scroll", onScroll);
        } catch (err) { console.debug('ContentSections removeEventListener error', err); }
      };
    }
  }, []);

  return (
    <main>
      <div className="overlay" id="overlay" aria-hidden="true"></div>

      <Videoshow />
      <TextDq />

      <div className="f13">
        <div id="text1" className="ff13">
          {section1}
        </div>
        <div id="text2" className="ff14">
          {section2}
        </div>
      </div>

       <div className="f13">
        <div id="text3" className="ff13 animate0110">
          {section3}
        </div>
        <div id="text4" className="ff14 animate0110">
          {section4}
        </div>
      </div>

      <div id="text5" className="container208 animate0110">
        {section5}
      </div>

      <div className="f113">
        <div id="text6" className="ff113 animate0110">
          {section6}
        </div>
      </div>

      <div className="f113 animate0110">
        <div id="text7" className="ff11303">
          {section7}
        </div>
      </div>

      <Slideshow />

      <div id="text10" className="ai-card-grid animate0110">
        {section10}
      </div>

      <CookieConsent />

      <ChatWidget />
      <Contact />
    </main>
  );
}
