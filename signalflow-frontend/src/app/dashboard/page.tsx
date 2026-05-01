"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import { connectSocket, getSocket } from "@/src/lib/socket";
import toast from "react-hot-toast";
import { removeToken } from "@/src/lib/auth";
import { getToken } from "@/src/lib/auth"; 
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [prices, setPrices] = useState<any>({});
  const [asset, setAsset] = useState("BTC");
  const [condition, setCondition] = useState("GREATER_THAN");
  const [price, setPrice] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  const fetchRules = async () => {
    try {
      const res = await api.get("/rules");
      setRules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await api.get("/alerts");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPrices = async () => {
    try {
      const res = await api.get("/prices");
      setPrices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createRule = async () => {
    try {
      await api.post("/rules", {
        assetSymbol: asset,
        condition,
        targetPrice: Number(price),
      });

      toast.success("Rule created ✅");
      setPrice("");
      fetchRules();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Error creating rule ❌");
    }
  };

  const deleteRule = async (id: string) => {
    try {
      setDeletingId(id);
      await api.delete(`/rules/${id}`);
      toast.success("Rule deleted 🗑️");
      fetchRules();
    } catch (err) {
      toast.error("Delete failed ❌");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    removeToken();
    toast.success("Logged out 👋");
    router.push("/login");
  };

  useEffect(() => {
    
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

   
    fetchRules();
    fetchPrices();
    fetchLogs();

    const interval = setInterval(fetchPrices, 5000);

    connectSocket();
    const socket = getSocket();

    socket.on("alert-triggered", (data: any) => {
      toast.success(`🔔 ${data.ruleId} @ ${data.price}`, {
        duration: 4000,
        style: { background: "#000", color: "#fff" },
      });

      fetchRules();
      fetchLogs();
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black text-black p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">SignalFlow Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-4 py-2 rounded hover:opacity-80"
        >
          Logout
        </button>
      </div>

     
      <div className="grid grid-cols-3 gap-6 mb-10">
        {["BTC", "ETH", "NIFTY50"].map((item) => (
          <div
            key={item}
            className="bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-xl shadow"
          >
            <h2 className="text-gray-600">{item}</h2>
            <p className="text-2xl font-bold text-black mt-2">
              {prices[item] || "--"}
            </p>
          </div>
        ))}
      </div>

   
      <div className="bg-white/80 backdrop-blur-md border p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl mb-4 text-black">Create Alert Rule</h2>

        <div className="flex flex-wrap gap-3">
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="NIFTY50">NIFTY50</option>
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="GREATER_THAN">GREATER_THAN</option>
            <option value="LESS_THAN">LESS_THAN</option>
          </select>

          <input
            type="number"
            placeholder="Target Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded"
          />

          <button
            onClick={createRule}
            className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-80"
          >
            Create
          </button>
        </div>
      </div>

    
      <div className="bg-white/80 backdrop-blur-md border p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl mb-4 text-black">Your Rules</h2>

        {rules.length === 0 && (
          <p className="text-gray-500">No rules yet</p>
        )}

        {rules.map((rule) => (
          <div
            key={rule._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div className="text-black">
              {rule.assetSymbol} | {rule.condition} | {rule.targetPrice}
            </div>

            <div className="flex items-center gap-4">

              <span className="font-semibold text-black">
                {rule.status}
              </span>

              <button
                onClick={() => deleteRule(rule._id)}
                disabled={deletingId === rule._id}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                {deletingId === rule._id ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        ))}
      </div>

     
      <div className="bg-white/80 backdrop-blur-md border p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4 text-black">Alert History</h2>

        {logs.length === 0 && (
          <p className="text-gray-500">No alerts yet</p>
        )}

        {logs.map((log) => (
          <div
            key={log._id}
            className="flex justify-between border-b py-3"
          >
            <div className="text-black">
              {log.ruleId?.assetSymbol} triggered at{" "}
              <span className="font-bold">{log.triggeredPrice}</span>
            </div>

            <div className="text-gray-600 text-sm">
              {new Date(log.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}