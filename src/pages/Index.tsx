import { useState, useEffect } from 'react';
import { restaurants } from '@/data/menu';
import { Link } from 'react-router-dom';

type TabType = 'home' | 'rituals' | 'live';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    const orders = localStorage.getItem('fastpass_orders');
    if (orders) {
      const parsedOrders = JSON.parse(orders);
      if (parsedOrders.length > 0) {
        setLastOrder(parsedOrders[parsedOrders.length - 1]);
      }
    }
  }, []);

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime < 10) return 'text-success';
    if (waitTime > 15) return 'text-destructive';
    return 'text-warning';
  };

  const getWaitTimeLabel = (waitTime: number) => {
    if (waitTime < 10) return 'Fast';
    if (waitTime > 15) return 'High Traffic';
    return `${waitTime} min wait`;
  };

  const sortedRestaurants = [...restaurants].sort((a, b) => a.waitTime - b.waitTime);
  const longestWaitRestaurants = sortedRestaurants.slice(-2);

  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-md mx-auto bg-background text-foreground">
      <header className="p-4 flex justify-between items-center bg-card border-b border-border">
        <div>
          <h1 className="text-xl font-bold">
            <span className="text-foreground">ASU</span>{' '}
            <span className="text-asu-gold">Eats</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            <i className="fas fa-map-marker-alt"></i> MU, Tempe Campus
          </p>
        </div>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">
          JD
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="p-4 space-y-6">
            <div className="bg-card p-3 rounded-lg border border-success/30 flex items-start space-x-3">
              <div className="bg-success/20 p-2 rounded-full text-success">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-success">AI Forecast: Heavy Rush Incoming</p>
                <p className="text-xs text-muted-foreground mt-1">
                  We predicted the 1:15 PM surge. These items are pre-cooked and ready NOW.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-bold mb-3 text-lg">🚀 Zero-Wait (Pre-Stocked)</h2>
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {longestWaitRestaurants.map((restaurant) =>
                  restaurant.menuItems.slice(0, 1).map((item) => (
                    <Link
                      key={item.id}
                      to={`/?restaurant=${restaurant.id}`}
                      className="min-w-[160px] bg-card rounded-xl p-3 border border-border hover:border-primary transition-colors"
                    >
                      <div className="h-20 bg-muted rounded-lg mb-2 flex items-center justify-center text-3xl">
                        {restaurant.emoji}
                      </div>
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{restaurant.name}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded font-bold">
                          Ready
                        </span>
                        <span className="text-sm font-bold">${item.price.toFixed(2)}</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {lastOrder && (
              <div>
                <button
                  onClick={() => {
                    localStorage.setItem('fastpass_cart', JSON.stringify(lastOrder.items));
                    localStorage.setItem('fastpass_selected_restaurant', lastOrder.restaurantId);
                    window.location.reload();
                  }}
                  className="w-full bg-asu-gold text-black font-bold py-4 rounded-xl mb-4 hover:opacity-90 transition-opacity"
                >
                  <i className="fas fa-repeat mr-2"></i> Re-order Last Meal
                </button>
              </div>
            )}

            <div>
              <h2 className="font-bold mb-3 text-lg">Standard Order</h2>
              <div className="space-y-3">
                {sortedRestaurants.map((restaurant) => (
                  <Link
                    key={restaurant.id}
                    to={`/?restaurant=${restaurant.id}`}
                    className="bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:border-primary transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-xl">
                        {restaurant.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold">{restaurant.name}</h3>
                        <p className={`text-xs ${getWaitTimeColor(restaurant.waitTime)}`}>
                          {restaurant.waitTime > 15 ? 'High Traffic • ' : ''}
                          {restaurant.waitTime < 10 ? 'Low Traffic • ' : ''}
                          {getWaitTimeLabel(restaurant.waitTime)}
                        </p>
                      </div>
                    </div>
                    <i className="fas fa-chevron-right text-muted-foreground"></i>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rituals' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-1">Weekly Rituals</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Automate your recurring meals.
            </p>

            <div className="flex justify-between mb-6 bg-card p-2 rounded-lg">
              <div className="text-center w-8">
                <div className="text-xs text-muted-foreground">M</div>
                <div className="text-sm font-bold text-asu-gold">19</div>
              </div>
              <div className="text-center w-8">
                <div className="text-xs text-muted-foreground">T</div>
                <div className="text-sm text-muted">20</div>
              </div>
              <div className="text-center w-8">
                <div className="text-xs text-muted-foreground">W</div>
                <div className="text-sm text-muted">21</div>
              </div>
              <div className="text-center w-8">
                <div className="text-xs text-muted-foreground">T</div>
                <div className="text-sm text-muted">22</div>
              </div>
              <div className="text-center w-8">
                <div className="text-xs text-muted-foreground">F</div>
                <div className="text-sm text-muted">23</div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden mb-4 relative">
              <div className="absolute top-0 left-0 h-full w-1 bg-asu-gold"></div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">
                      Today, 12:00 PM
                    </span>
                    <i className="fas fa-bell text-xs text-asu-gold"></i>
                  </div>
                  <h3 className="font-bold text-lg">Monday Taco Fix</h3>
                  <p className="text-xs text-muted-foreground">3x Soft Tacos • No Onions</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                </label>
              </div>
              <div className="bg-muted/50 p-2 text-xs text-center text-muted-foreground">
                Pre-orders fire at 11:45 AM automatically.
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden mb-4 relative opacity-60">
              <div className="absolute top-0 left-0 h-full w-1 bg-border"></div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">
                      Wed, 8:30 AM
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">Morning Bagel</h3>
                  <p className="text-xs text-muted-foreground">
                    Einstein Bros • Plain + Cream Cheese
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                </label>
              </div>
            </div>

            <button className="w-full py-3 rounded-lg border-2 border-dashed border-border text-muted-foreground font-bold text-sm hover:bg-card transition-colors">
              + Create New Ritual
            </button>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="h-full relative bg-card">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>

              <div className="w-64 h-64 rounded-full border-2 border-dashed border-border flex items-center justify-center relative">
                <div className="absolute -top-6 bg-card text-muted-foreground text-xs px-2 py-1 rounded border border-border">
                  Geofence Boundary
                </div>

                <div className="w-16 h-16 bg-asu-maroon rounded-lg flex items-center justify-center z-10 shadow-xl border-2 border-foreground">
                  <span className="font-bold text-foreground">MU</span>
                </div>
              </div>

              <div className="absolute bottom-10 left-10">
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-foreground relative">
                  <div className="absolute -top-8 -left-8 w-20 text-center bg-blue-900 text-white text-[10px] px-1 rounded py-0.5">
                    You
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 w-full bg-card border-t border-border p-5 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-muted-foreground">Order Held</h3>
                  <p className="text-xs text-muted">Waiting for you to get closer...</p>
                </div>
                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                  <i className="fas fa-pause"></i>
                </div>
              </div>

              <div className="w-full bg-muted h-2 rounded-full mb-6 overflow-hidden">
                <div className="bg-muted-foreground h-full w-1/4 transition-all duration-500"></div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg">
                <i className="fas fa-walking mr-2"></i> Simulate: Walk to MU
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="bg-card border-t border-border flex justify-around py-3 text-xs font-medium">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center space-y-1 px-4 ${
            activeTab === 'home' ? 'text-asu-gold border-t-2 border-asu-gold' : 'text-muted-foreground'
          }`}
        >
          <i className="fas fa-utensils text-lg"></i>
          <span>Eat Now</span>
        </button>
        <button
          onClick={() => setActiveTab('rituals')}
          className={`flex flex-col items-center space-y-1 px-4 ${
            activeTab === 'rituals' ? 'text-asu-gold border-t-2 border-asu-gold' : 'text-muted-foreground'
          }`}
        >
          <i className="fas fa-calendar-alt text-lg"></i>
          <span>Rituals</span>
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex flex-col items-center space-y-1 px-4 ${
            activeTab === 'live' ? 'text-asu-gold border-t-2 border-asu-gold' : 'text-muted-foreground'
          }`}
        >
          <i className="fas fa-satellite-dish text-lg"></i>
          <span>Live</span>
        </button>
      </nav>
    </div>
  );
};

export default Index;
