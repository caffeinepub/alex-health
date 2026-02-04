import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, TrendingUp, Calendar, Utensils, Dumbbell, Apple, Clock } from 'lucide-react';

export default function AuthLanding() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="container mx-auto px-4 py-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/app-icon.dim_512x512.png" alt="Alex Health" className="h-12 w-12 rounded-xl" />
          <h1 className="text-2xl font-bold text-foreground">Alex Health</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                  Transform Your Life with
                  <span className="text-primary block mt-2">Personalized Wellness</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Alex Health combines expert-designed plans with simple daily tracking to help you achieve lasting health transformation. Document your journey, see real progress, and thrive.
                </p>
              </div>

              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="lg"
                className="text-lg px-10 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {isLoggingIn ? 'Connecting...' : 'Start Your Journey'}
              </Button>

              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Start in 30 seconds</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1600x600.png"
                alt="Alex Health Dashboard"
                className="rounded-2xl shadow-2xl w-full border border-border/50"
              />
            </div>
          </div>
        </section>

        {/* How It Works: Plans + Documentation */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Plans + Documentation = Results
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the roadmap, you document the journey. Track what matters, see what works, and build habits that last.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Get Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Start with structured wellness plans designed by experts. Whether it's nutrition, exercise, or lifestyle habits, we give you a clear path forward.
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">2. Document Daily</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Log your meals, workouts, sleep, and activities in seconds. Simple tracking keeps you accountable and aware of your patterns.
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">3. See Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Beautiful charts and insights show you exactly how you're improving. Celebrate wins, adjust what's not working, and keep moving forward.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Diet Plans Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-chart-3/10 flex items-center justify-center">
                  <Apple className="h-7 w-7 text-chart-3" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Nutrition That Works</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our diet plans aren't about restriction—they're about sustainable eating that fuels your life. Track what you eat, understand your patterns, and make informed choices.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <Utensils className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Meal-by-Meal Logging</p>
                    <p className="text-sm text-muted-foreground">Breakfast, lunch, dinner, snacks—document everything to see the full picture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Hydration Tracking</p>
                    <p className="text-sm text-muted-foreground">Stay on top of your water intake with simple daily logs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Pattern Recognition</p>
                    <p className="text-sm text-muted-foreground">Discover which foods give you energy and which don't serve you</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-card to-chart-3/5 border-chart-3/20">
              <CardHeader>
                <CardTitle className="text-xl">Sample Daily Meal Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Breakfast (7:30 AM)</p>
                  <p className="text-sm text-muted-foreground">Oatmeal with berries, almonds, and honey. Green tea.</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Lunch (12:30 PM)</p>
                  <p className="text-sm text-muted-foreground">Grilled chicken salad with mixed greens, quinoa, and olive oil dressing.</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Snack (3:00 PM)</p>
                  <p className="text-sm text-muted-foreground">Greek yogurt with walnuts and a small apple.</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Dinner (7:00 PM)</p>
                  <p className="text-sm text-muted-foreground">Baked salmon with roasted vegetables and brown rice.</p>
                </div>
                <div className="text-sm text-muted-foreground italic pt-2 border-t border-border/50">
                  Log each meal in seconds. Adjust portions and timing to fit your lifestyle.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Exercise Plans Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="bg-gradient-to-br from-card to-chart-1/5 border-chart-1/20 lg:order-2">
              <CardHeader>
                <CardTitle className="text-xl">Sample Weekly Workout Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Monday: Strength Training</p>
                  <p className="text-sm text-muted-foreground">45 min • Upper body focus • Moderate intensity</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Tuesday: Cardio</p>
                  <p className="text-sm text-muted-foreground">30 min • Running or cycling • High intensity</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Wednesday: Active Recovery</p>
                  <p className="text-sm text-muted-foreground">20 min • Yoga or stretching • Light intensity</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Thursday: Strength Training</p>
                  <p className="text-sm text-muted-foreground">45 min • Lower body focus • Moderate intensity</p>
                </div>
                <div className="p-4 rounded-lg bg-background/80 backdrop-blur">
                  <p className="font-semibold text-foreground mb-1">Friday: HIIT</p>
                  <p className="text-sm text-muted-foreground">25 min • High-intensity intervals • High intensity</p>
                </div>
                <div className="text-sm text-muted-foreground italic pt-2 border-t border-border/50">
                  Track duration, intensity, and notes for every workout. See your consistency build over time.
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-chart-1/10 flex items-center justify-center">
                  <Dumbbell className="h-7 w-7 text-chart-1" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Exercise Made Simple</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a beginner or an athlete, our exercise plans meet you where you are. Log every workout, track your intensity, and watch your fitness soar.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Workout Logging</p>
                    <p className="text-sm text-muted-foreground">Record type, duration, intensity, and personal notes for every session</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Progress Metrics</p>
                    <p className="text-sm text-muted-foreground">See total minutes, workout count, active days, and average intensity at a glance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Visual Trends</p>
                    <p className="text-sm text-muted-foreground">Beautiful charts show your consistency and improvement over 7 or 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Thrive
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete wellness platform designed for real people with real lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center mx-auto mb-3">
                  <Activity className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle className="text-lg">Exercise Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Log workouts with duration, type, and intensity. See weekly metrics and trends.
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center mx-auto mb-3">
                  <Utensils className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="text-lg">Meal Logging</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Document every meal and snack. Build awareness of your eating patterns.
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-chart-2/10 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle className="text-lg">Progress Charts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Beautiful visualizations show your fitness, hydration, and sleep trends.
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-chart-4/10 flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle className="text-lg">Habit Reminders</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Set custom reminders to stay consistent with your wellness goals.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="py-12 px-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Health?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join Alex Health today and start building the healthy, thriving life you deserve. No commitments, no complexity—just results.
              </p>
              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="lg"
                className="text-lg px-10 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {isLoggingIn ? 'Connecting...' : 'Get Started Free'}
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © 2026. Built with <Heart className="inline h-4 w-4 text-chart-4" /> using{' '}
          <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
