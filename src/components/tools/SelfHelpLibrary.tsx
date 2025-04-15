
import React, { useState } from 'react';
import FlashCard from './FlashCard';

// Flash card content for the library
const flashCards = [
  {
    title: "The 5-4-3-2-1 Grounding Trick for Instant Calm",
    content: "When anxiety hits, engage your senses. Look for 5 things you can see, 4 things you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This method gently pulls you out of spiraling thoughts and into the present. It's especially helpful during panic attacks or high stress. Practicing it regularly trains your mind to focus. Try naming the objects aloud for stronger grounding. You're not trying to fix everything — just trying to feel safer in the now. Breathe slowly, and come back to yourself, one sense at a time."
  },
  {
    title: "Box Breathing: A 4-Step Calm-Down Ritual",
    content: "Box breathing is simple but powerful. Inhale for 4 seconds, hold for 4, exhale for 4, and hold again for 4. Repeat this cycle for a few minutes. It resets your nervous system, slows your heart rate, and signals safety to your brain. Visualize a square if it helps — draw it in the air with your finger. This method is used by athletes and soldiers under pressure. You can use it before a test, a hard conversation, or to calm sudden panic. You're literally creating space in your body and mind. Try it now: in… hold… out… hold."
  },
  {
    title: "How to Stop Overthinking with the 'Worry Timer' Trick",
    content: "Overthinking can trap you in loops. The \"worry timer\" trick helps contain it. Set a 10-minute timer. During that time, worry as much as you want. Write, rant, or just sit. When the timer ends, stop. You've honored the anxiety without letting it control your whole day. Most people find they run out of things to worry about before the timer ends. The mind needs a container, not total freedom. This trick trains your brain to respect boundaries. Worry intentionally, then walk away. You'll feel clearer — and surprisingly, lighter. Anxiety doesn't need to take over. You're still in charge."
  },
  {
    title: "The Rule of 3: Get Through a Bad Day One Task at a Time",
    content: "When you're low, even brushing your teeth can feel impossible. The Rule of 3 is simple: choose 3 small tasks to complete today. Maybe it's showering, replying to one message, and eating something warm. Don't overthink it. These are victories. Depression distorts your view of progress — but progress isn't big moves, it's consistent tiny ones. Completing just three things builds trust with yourself. On some days, those 3 tasks are enough. You don't need to do everything. You just need to do *something*. The rule gives structure without pressure. Small steps count. You are not lazy. You are trying."
  },
  {
    title: "Small Wins, Big Shifts: A Guide to Beating the All-or-Nothing Trap",
    content: "Perfectionism often fuels depression. If you feel like a failure unless you do everything, you'll freeze and do nothing. The way out? Focus on *small wins*. Make your bed. Drink water. Reply to one message. These aren't trivial — they're momentum. Your brain rewards completion, no matter the task's size. This breaks the shame spiral and invites energy back in. All-or-nothing thinking says \"everything or failure.\" Small wins say \"enough is enough.\" Write down 3 things you did today — no matter how small. You'll begin to feel human again. Don't aim for perfect. Aim for progress."
  },
  {
    title: "Morning Routines for Low-Energy Days",
    content: "Not every morning has to be productive. Some days, just getting up is an achievement. Create a gentle routine: open a window, sip water, stretch, and sit quietly for 5 minutes. That's it. No pressure. You don't need a checklist, just rhythm. This builds a compassionate start to your day, not a shame spiral. Make your bed only if it makes you feel good. Play soft music or nature sounds. Light a candle. These small acts signal your body to wake gently. Low energy doesn't mean failure. It means you're healing. Let your morning meet you where you are."
  },
  {
    title: "Journaling to Release Mental Clutter",
    content: "Your mind can feel loud when emotions pile up. Journaling offers a way to release that clutter. Write freely — no grammar, no pressure. Just empty your head onto paper. List your worries, or answer a prompt like: \"What am I carrying today?\" or \"What do I need to hear right now?\" It's not about solving everything. It's about making space. Rereading isn't necessary — the power is in the release. Make it a ritual, even 5 minutes a day. Over time, you'll notice patterns, triggers, and maybe even solutions. This is your private space. Let it hold you."
  },
  {
    title: "Self-Love Challenge: Mirror Talk",
    content: "Stand in front of a mirror. Look into your eyes and say something kind — even if it feels weird. \"I'm proud of you.\" \"You're doing your best.\" \"I love you.\" This practice builds self-trust and soothes inner criticism. At first, you may resist. That's okay. Healing often starts with discomfort. Do it daily, even for one minute. Add affirmations that resonate. Over time, the voice in your head becomes gentler. Self-love isn't arrogance — it's choosing not to be your own enemy. Speak to yourself as you would to a dear friend. You deserve your own compassion."
  },
  {
    title: "The Power of Saying No Without Guilt",
    content: "Saying no is self-respect in action. You are not responsible for others' feelings at the cost of your peace. Practice saying no with kindness: \"I can't commit right now,\" or \"That doesn't work for me.\" Your time and energy are limited — protect them. Guilt will come, especially if you're used to people-pleasing. But guilt is not the same as wrongdoing. Every 'no' is a 'yes' to something else — your rest, boundaries, or values. You don't need a reason to say no. You just need courage. Self-care includes uncomfortable choices. Start small, and trust your right to protect your peace."
  },
  {
    title: "Breathing Through a Panic Attack",
    content: "Panic attacks feel like emergencies — racing heart, short breath, dizziness. First, remind yourself: this is panic, not danger. Sit down, place one hand on your chest, the other on your belly. Inhale deeply for 4 seconds, feel the belly rise. Exhale slowly for 6 seconds. Repeat. Count out loud if needed. Ground with your senses — name colors in the room, press feet to the floor. You're not broken, just overwhelmed. Let the wave rise and pass. It always does. Text someone or use a calming mantra like \"This will pass.\" You've survived before. You will again. You're not alone."
  },
  {
    title: "How to Use Affirmations That Actually Work",
    content: "Affirmations can feel fake if you don't believe them. Instead of saying \"I'm amazing\" when you don't feel it, try bridge statements: \"I'm learning to trust myself.\" \"It's possible I'm worthy.\" Use present-tense and emotionally neutral phrases that still nudge your mindset. Repeat them aloud or write them daily. Place them where you'll see them — mirror, wallpaper, journal. Consistency builds familiarity, and familiarity becomes belief. You're not lying to yourself — you're rewiring. Choose affirmations that feel kind, not forced. They should soothe, not pressure. This is about changing the narrative one gentle phrase at a time."
  },
  {
    title: "Feeling Empty? Try a Sensory Reset",
    content: "Emotional numbness can leave you feeling like a ghost in your own life. A sensory reset reconnects you with the world. Try a warm shower, a cold splash on your face, spicy food, walking barefoot on grass, or cuddling a blanket. Light a candle. Listen to rain sounds. Move your body — even gently. You're not trying to \"fix\" yourself, just to *feel* something. These sensations act like jumper cables to your nervous system. You don't need a full recharge — a spark is enough. Your feelings aren't gone forever. They're just under snow. Warmth brings them back. Slowly. Kindly."
  }
];

const SelfHelpLibrary: React.FC = () => {
  // State to track which card is flipped
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  // Function to handle card flipping
  const handleCardFlip = (index: number) => {
    if (flippedCardIndex === index) {
      setFlippedCardIndex(null); // Flip back
    } else {
      setFlippedCardIndex(index); // Flip to this card
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-2">Self-Help Library</h2>
      <p className="text-muted-foreground mb-8">
        A collection of 100-word wellness techniques you can practice anytime. Click a card to read more.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashCards.map((card, index) => (
          <FlashCard
            key={index}
            title={card.title}
            content={card.content}
            isFlipped={flippedCardIndex === index}
            onClick={() => handleCardFlip(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelfHelpLibrary;
