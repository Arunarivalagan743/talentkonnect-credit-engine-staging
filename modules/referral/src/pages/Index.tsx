
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { handleEnrollApi } from "@/services/referralService";
import { handleCreditsApi } from "@/services/ledgerService";
import { Sparkles, Star, Gift, Smile } from "lucide-react";

const bgUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const Index = () => {
  // Form fields
  const [userId, setUserId] = useState("");
  const [actionType, setActionType] = useState("enroll");
  const [creditsAwarded, setCreditsAwarded] = useState(50);
  const [referrerId, setReferrerId] = useState("");

  // App state
  const [result, setResult] = useState(null);
  const [ledger, setLedger] = useState(null);

  // Submit handler
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId.trim()) {
      alert("Please provide a userId");
      return;
    }
    // Enroll user & award credits
    const res = handleEnrollApi({
      userId,
      actionType,
      creditsAwarded: Number(creditsAwarded),
      referrerId: referrerId ? referrerId : undefined,
    });
    setResult(res);
    // Refresh ledger info for the user
    setLedger(handleCreditsApi(userId));
  }

  // Show ledger again if userId changes
  React.useEffect(() => {
    if (userId) {
      setLedger(handleCreditsApi(userId));
    }
  }, [userId]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative bg-gradient-to-br from-blue-50 via-white to-purple-100"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.96)), url(${bgUrl})`,
        backgroundPosition: "center 10%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Hero */}
      <div className="w-full max-w-2xl flex flex-col items-center py-10 px-2 text-center animate-fade-in">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-400/70 to-violet-400/70 shadow-md mb-3 text-white font-semibold tracking-wide">
          <Sparkles className="text-yellow-200" size={22} /> 
          REWARD YOUR FRIENDS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-900 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent mb-2 drop-shadow">
          Credit Referral Engine Demo
        </h1>
        <p className="max-w-xl text-muted-foreground mt-2 mb-6 text-lg font-medium">
          Earn credits, invite friends, get bonuses!
        </p>
      </div>

      {/* Main Card Area */}
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-6 items-stretch">
        {/* Enroll Form */}
        <Card className="w-full md:w-1/2 shadow-lg animate-scale-in bg-gradient-to-tl from-white via-indigo-50 to-purple-50/90 backdrop-blur-md border-0 border-l-4 border-l-fuchsia-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-fuchsia-700">
              <Gift className="text-yellow-400 drop-shadow" size={28} />
              Enroll User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="mt-1 focus:ring-2 focus:ring-indigo-400/70 transition"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Label htmlFor="actionType">Action Type</Label>
                <Input
                  id="actionType"
                  type="text"
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="mt-1 focus:ring-2 focus:ring-indigo-400/70 transition"
                />
              </div>
              <div>
                <Label htmlFor="creditsAwarded">Credits Awarded</Label>
                <Input
                  id="creditsAwarded"
                  type="number"
                  min={1}
                  value={creditsAwarded}
                  onChange={(e) => setCreditsAwarded(Number(e.target.value))}
                  className="mt-1 focus:ring-2 focus:ring-indigo-400/70 transition"
                />
              </div>
              <div>
                <Label htmlFor="referrerId">Referrer ID (optional)</Label>
                <Input
                  id="referrerId"
                  type="text"
                  value={referrerId}
                  onChange={(e) => setReferrerId(e.target.value)}
                  className="mt-1 focus:ring-2 focus:ring-indigo-400/70 transition"
                  placeholder="A friend's user ID"
                />
              </div>
              <Button
                className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-105 transition font-semibold text-lg py-2 shadow-md"
                type="submit"
              >
                <Star className="mr-1" size={18} />
                Enroll & Award Credits
              </Button>
            </form>
            {result && (
              <div className="mt-2 text-center text-green-700 font-semibold animate-fade-in">
                <Smile className="inline mb-1" /> Enrollment processed!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ledger Display */}
        <Card className="w-full md:w-1/2 flex flex-col shadow-2xl animate-scale-in bg-gradient-to-tl from-white via-purple-100 to-fuchsia-50/90 backdrop-blur-md border-0 border-l-4 border-l-indigo-300 overflow-x-auto">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-indigo-700 mb-1">
              <Star className="text-fuchsia-400 drop-shadow" size={26} />
              Ledger
            </CardTitle>
            {ledger && (
              <div className="text-md font-semibold text-gray-600 animate-fade-in">
                Total Credits:{" "}
                <span className="text-violet-800 font-extrabold">
                  {ledger.totalCredits}
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {ledger && ledger.events && ledger.events.length > 0 ? (
              <div className="w-full overflow-x-auto animate-fade-in">
                <table className="w-full rounded text-sm bg-white/70 shadow">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-200 to-pink-100 text-gray-800">
                      <th className="py-2 pr-2 px-2">Type</th>
                      <th className="py-2 pr-2 px-2">Credits</th>
                      <th className="py-2 pr-2 px-2">Ref Bonus</th>
                      <th className="py-2 pr-2 px-2">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger.events.map((ev, idx) => (
                      <tr
                        key={idx}
                        className="transition hover:bg-fuchsia-50"
                      >
                        <td className="py-2 pr-2 px-2">{ev.actionType}</td>
                        <td className="py-2 pr-2 px-2">{ev.creditsAwarded}</td>
                        <td className="py-2 pr-2 px-2">
                          {ev.referrerBonus ? (
                            <>
                              <span className="font-bold text-fuchsia-600">
                                {ev.referrerBonus}
                              </span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-2 pr-2 px-2">{new Date(ev.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-muted-foreground mt-5 animate-fade-in">
                No events yet. <br />
                <span className="inline-block mt-2"><Gift size={18} className="text-yellow-400" /></span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Decorative Divider */}
      <div className="my-10 flex w-full max-w-xl mx-auto items-center gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent"></div>
        <Sparkles className="text-fuchsia-400 animate-pulse" size={32} />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"></div>
      </div>


    </div>
  );
};

export default Index;

