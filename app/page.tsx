import Link from "next/link";
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Leaf,
  Play,
  Sparkles,
  Target,
  Upload,
  ArrowRight,
} from "lucide-react";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <main className="homePage">
      {/* Navigation */}
      <nav className="homeNav">
        <Link href="/" className="homeBrand">
          <span className="homeLogo">
            <Leaf size={20} strokeWidth={2.2} />
          </span>

          <span>
            <strong>ExamPrep Planner</strong>
            <small>Study with clarity.</small>
          </span>
        </Link>

        <div className="homeNavLinks">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#why">Why ExamPrep</a>
        </div>

        <div className="homeNavActions">
          <Link href="/sign-in" className="homeLogin">
            Sign in
          </Link>

          <Link href="/sign-up" className="homeSignup">
            Get started
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="homeHero">
        <div className="heroContent">
          <div className="heroBadge">
            <Sparkles size={14} />
            <span>Built for focused exam preparation</span>
          </div>

          <h1>
            Your syllabus.
            <br />
            <span>Your plan. Your progress.</span>
          </h1>

          <p>
            ExamPrep Planner turns a complicated syllabus into a calm,
            structured study system. Plan your days, track your progress,
            revise smarter, and stay consistent.
          </p>

          <div className="heroActions">
            <Link href="/sign-up" className="heroPrimary">
              Start planning free
              <ArrowRight size={17} />
            </Link>

            <a href="#how-it-works" className="heroSecondary">
              <Play size={15} fill="currentColor" />
              See how it works
            </a>
          </div>

          <div className="heroTrust">
            <CheckCircle2 size={16} />
            <span>Designed for UPSC & competitive exam aspirants</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="dashboardPreview">
          <div className="previewWindow">
            <div className="previewTop">
              <div className="previewDots">
                <i />
                <i />
                <i />
              </div>

              <span>ExamPrep Planner</span>

              <div className="previewAvatar">A</div>
            </div>

            <div className="previewBody">
              <div className="previewGreeting">
                <div>
                  <small>MONDAY, 14 SEPTEMBER</small>
                  <h3>Good morning, Abhishek</h3>
                  <p>Let's make today's study count.</p>
                </div>

                <div className="previewRing">
                  <strong>68%</strong>
                  <span>Progress</span>
                </div>
              </div>

              <div className="previewStats">
                <div>
                  <span className="previewIcon">
                    <BookOpen size={15} />
                  </span>
                  <section>
                    <strong>12</strong>
                    <small>Topics today</small>
                  </section>
                </div>

                <div>
                  <span className="previewIcon">
                    <Clock3 size={15} />
                  </span>
                  <section>
                    <strong>4.5h</strong>
                    <small>Study planned</small>
                  </section>
                </div>

                <div>
                  <span className="previewIcon">
                    <Target size={15} />
                  </span>
                  <section>
                    <strong>82%</strong>
                    <small>Weekly goal</small>
                  </section>
                </div>
              </div>

              <div className="previewSectionTitle">
                <strong>Today's plan</strong>
                <span>View all</span>
              </div>

              <div className="previewTasks">
                <div className="previewTask">
                  <span className="taskTime">08:00</span>
                  <span className="miniCheck checked">
                    <CheckCircle2 size={13} />
                  </span>
                  <div>
                    <strong>Indian Polity</strong>
                    <small>Fundamental Rights</small>
                  </div>
                  <b>60 min</b>
                </div>

                <div className="previewTask">
                  <span className="taskTime">10:00</span>
                  <span className="miniCheck" />
                  <div>
                    <strong>Modern History</strong>
                    <small>Freedom Movement</small>
                  </div>
                  <b>90 min</b>
                </div>

                <div className="previewTask">
                  <span className="taskTime">14:00</span>
                  <span className="miniCheck" />
                  <div>
                    <strong>Geography</strong>
                    <small>Indian Monsoon</small>
                  </div>
                  <b>60 min</b>
                </div>
              </div>
            </div>
          </div>

          <div className="previewGlow" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="homeSection">
        <div className="sectionIntro">
          <span>EVERYTHING IN ONE PLACE</span>
          <h2>Study less chaotically.<br />Study more intentionally.</h2>
          <p>
            Everything you need to turn your syllabus into a realistic,
            trackable study routine.
          </p>
        </div>

        <div className="featureGrid">
          <FeatureCard
            icon={<FileText size={20} />}
            title="Your syllabus, your way"
            description="Upload a syllabus or type it yourself. Organize subjects, topics and subtopics exactly how you study."
          />

          <FeatureCard
            icon={<CalendarDays size={20} />}
            title="Plan your study days"
            description="Break your preparation into manageable sessions and create a realistic daily study plan."
          />

          <FeatureCard
            icon={<Target size={20} />}
            title="See your progress"
            description="Know exactly how much of your syllabus is complete and where you need to focus next."
          />

          <FeatureCard
            icon={<Clock3 size={20} />}
            title="Focus sessions"
            description="Use focused study timers for 25, 50 or 90-minute sessions without leaving your planner."
          />

          <FeatureCard
            icon={<CheckCircle2 size={20} />}
            title="Track tests & revision"
            description="Record mock tests, revision sessions and important milestones in one place."
          />

          <FeatureCard
            icon={<BookOpen size={20} />}
            title="Keep your notes close"
            description="Create study notes alongside your preparation so everything stays connected."
          />
        </div>
      </section>

      {/* Syllabus section */}
      <section id="why" className="homeSyllabus">
        <div className="syllabusVisual">
          <div className="syllabusCard">
            <div className="syllabusCardHeader">
              <div>
                <small>MY SYLLABUS</small>
                <h3>UPSC Civil Services</h3>
              </div>

              <span className="syllabusProgress">64%</span>
            </div>

            <div className="syllabusBar">
              <span />
            </div>

            <div className="syllabusSubject">
              <div className="subjectSymbol">P</div>
              <div>
                <strong>Indian Polity</strong>
                <small>42 of 58 topics complete</small>
              </div>
              <b>72%</b>
            </div>

            <div className="syllabusSubject">
              <div className="subjectSymbol">H</div>
              <div>
                <strong>Modern History</strong>
                <small>31 of 50 topics complete</small>
              </div>
              <b>62%</b>
            </div>

            <div className="syllabusSubject">
              <div className="subjectSymbol">G</div>
              <div>
                <strong>Geography</strong>
                <small>27 of 46 topics complete</small>
              </div>
              <b>59%</b>
            </div>

            <div className="syllabusSubject">
              <div className="subjectSymbol">E</div>
              <div>
                <strong>Economy</strong>
                <small>19 of 38 topics complete</small>
              </div>
              <b>50%</b>
            </div>
          </div>
        </div>

        <div className="syllabusContent">
          <span className="sectionLabel">START WITH YOUR SYLLABUS</span>
          <h2>Don't force your preparation into someone else's template.</h2>

          <p>
            Every aspirant studies differently. ExamPrep Planner lets you
            bring your own syllabus and build your preparation around it.
          </p>

          <div className="syllabusPoints">
            <div>
              <span>
                <Upload size={17} />
              </span>
              <section>
                <strong>Upload your syllabus</strong>
                <small>Bring a PDF, document or text file.</small>
              </section>
            </div>

            <div>
              <span>
                <FileText size={17} />
              </span>
              <section>
                <strong>Or type it yourself</strong>
                <small>Create subjects and topics manually.</small>
              </section>
            </div>

            <div>
              <span>
                <CheckCircle2 size={17} />
              </span>
              <section>
                <strong>Edit whenever you want</strong>
                <small>Your plan changes as your preparation evolves.</small>
              </section>
            </div>
          </div>

          <Link href="/sign-up" className="textLink">
            Build my syllabus
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="homeSection howSection">
        <div className="sectionIntro">
          <span>SIMPLE BY DESIGN</span>
          <h2>Three steps to a calmer<br />study routine.</h2>
        </div>

        <div className="steps">
          <Step
            number="01"
            icon={<BookOpen size={20} />}
            title="Add your syllabus"
            text="Upload your syllabus or create subjects and topics manually."
          />

          <Step
            number="02"
            icon={<CalendarDays size={20} />}
            title="Plan your days"
            text="Turn your topics into focused study sessions and daily tasks."
          />

          <Step
            number="03"
            icon={<Target size={20} />}
            title="Track & improve"
            text="Complete topics, review your progress and adjust your plan."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="homeCTA">
        <div className="ctaLeaf">
          <Leaf size={25} />
        </div>

        <span>YOUR PREPARATION STARTS HERE</span>

        <h2>A calmer way to prepare<br />for what matters.</h2>

        <p>
          Build your plan once. Then focus on today's work.
        </p>

        <Link href="/sign-up" className="ctaButton">
          Create your free planner
          <ArrowRight size={17} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="homeFooter">
        <Link href="/" className="footerBrand">
          <span className="footerLogo">
            <Leaf size={17} />
          </span>
          <strong>ExamPrep Planner</strong>
        </Link>

        <span>Study with clarity. Grow with consistency.</span>

        <div>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Get started</Link>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="featureCard">
      <span className="featureIcon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="step">
      <div className="stepTop">
        <span className="stepNumber">{number}</span>
        <span className="stepIcon">{icon}</span>
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}