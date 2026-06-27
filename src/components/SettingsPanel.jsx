import { useEffect, useState } from 'react';

/**
 * A live control panel for Alya's persona and memory - talks directly to
 * the REST endpoints on the backend (persona.routes.js / memory.routes.js).
 * Lets you tune personality and prune memories without redeploying anything,
 * which is the entire point of storing persona/memory in the DB instead of
 * hardcoding them (unlike Bella's cloudAPI.js).
 */
export function SettingsPanel({ backendHttpUrl, userId, onClose }) {
  const [persona, setPersona] = useState(null);
  const [memories, setMemories] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${backendHttpUrl}/api/persona/${userId}`).then((r) => r.json()),
      fetch(`${backendHttpUrl}/api/memory/${userId}`).then((r) => r.json()),
    ])
      .then(([personaData, memoryData]) => {
        if (cancelled) return;
        setPersona(personaData);
        setMemories(memoryData);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, [backendHttpUrl, userId]);

  async function savePersona() {
    setStatus('saving');
    const res = await fetch(`${backendHttpUrl}/api/persona/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemPrompt: persona.systemPrompt,
        traits: persona.traits,
        language: persona.language,
      }),
    });
    const updated = await res.json();
    setPersona(updated);
    setStatus('ready');
  }

  async function deleteMemory(id) {
    await fetch(`${backendHttpUrl}/api/memory/${id}`, { method: 'DELETE' });
    setMemories((prev) => prev.filter((m) => m._id !== id));
  }

  return (
    <div className="settings">
      <div className="settings__header">
        <h2>Alya settings</h2>
        <button onClick={onClose}>Close</button>
      </div>

      {status === 'loading' && <p className="settings__hint">Loading...</p>}
      {status === 'error' && <p className="settings__hint">Couldn't reach the backend.</p>}

      {persona && (
        <section className="settings__section">
          <label className="settings__label">System prompt</label>
          <textarea
            className="settings__textarea"
            value={persona.systemPrompt}
            onChange={(e) => setPersona({ ...persona, systemPrompt: e.target.value })}
            rows={6}
          />

          <label className="settings__label">Traits (comma-separated)</label>
          <input
            className="settings__input"
            value={persona.traits?.join(', ') ?? ''}
            onChange={(e) =>
              setPersona({ ...persona, traits: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })
            }
          />

          <button onClick={savePersona} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving...' : 'Save persona'}
          </button>
        </section>
      )}

      <section className="settings__section">
        <label className="settings__label">Things Alya remembers ({memories.length})</label>
        {memories.length === 0 && <p className="settings__hint">Nothing saved yet — try the remember_fact tool in a session.</p>}
        <ul className="settings__memoryList">
          {memories.map((m) => (
            <li key={m._id} className="settings__memoryItem">
              <span>{m.fact}</span>
              <button onClick={() => deleteMemory(m._id)} title="Forget this">✕</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
