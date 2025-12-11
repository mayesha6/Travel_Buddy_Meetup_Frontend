/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  initial?: any;
  onSubmit: (payload: any) => Promise<void>;
}

export default function TravelPlanForm({ initial, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [destination, setDestination] = useState(initial?.destination || "");
  const [startDate, setStartDate] = useState(initial?.startDate ? new Date(initial.startDate).toISOString().slice(0,10) : "");
  const [endDate, setEndDate] = useState(initial?.endDate ? new Date(initial.endDate).toISOString().slice(0,10) : "");
  const [budgetMin, setBudgetMin] = useState(initial?.budgetMin || "");
  const [budgetMax, setBudgetMax] = useState(initial?.budgetMax || "");
  const [travelType, setTravelType] = useState(initial?.travelType || "SOLO");
  const [interests, setInterests] = useState((initial?.interests || []).join(", "));
  const [visibility, setVisibility] = useState(initial?.visibility || "PUBLIC");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        destination,
        startDate,
        endDate,
        budgetMin: budgetMin ? Number(budgetMin) : undefined,
        budgetMax: budgetMax ? Number(budgetMax) : undefined,
        travelType,
        interests: interests ? interests.split(",").map((s: string)=>s.trim()) : [],
        visibility
      };
      await onSubmit(payload);
    } catch (err: any) {
      toast.error(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-2xl" onSubmit={submit}>
      <Input name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
      <Input name="destination" value={destination} onChange={(e)=>setDestination(e.target.value)} placeholder="Destination" required />
      <div className="flex gap-2">
        <Input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} required />
        <Input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} required />
      </div>
      <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" required />
      <div className="flex gap-2">
        <Input type="number" placeholder="Budget Min" value={budgetMin} onChange={(e)=>setBudgetMin(e.target.value)} />
        <Input type="number" placeholder="Budget Max" value={budgetMax} onChange={(e)=>setBudgetMax(e.target.value)} />
      </div>
      <Input placeholder="Interests (comma separated)" value={interests} onChange={(e)=>setInterests(e.target.value)} />
      <div className="flex gap-2">
        <select value={travelType} onChange={(e)=>setTravelType(e.target.value)} className="p-2 border rounded">
          <option value="SOLO">Solo</option>
          <option value="FAMILY">Family</option>
          <option value="FRIENDS">Friends</option>
          <option value="COUPLE">Couple</option>
        </select>
        <select value={visibility} onChange={(e)=>setVisibility(e.target.value)} className="p-2 border rounded">
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
    </form>
  );
}
